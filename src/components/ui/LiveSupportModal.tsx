import { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff } from 'lucide-react';

interface LiveSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveSupportModal = ({ isOpen, onClose }: LiveSupportModalProps) => {
  const [transcript, setTranscript] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  useEffect(() => {
    if (!isOpen) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      if (event.results[last].isFinal) {
        setTranscript(prev => [...prev, `Vous: ${text}`]);
        handleUserSpeech(text);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [isOpen]);

  const handleUserSpeech = async (_text: string) => {
    try {
      // Simulation de réponse IA
      const responses = [
        "Je suis là pour vous aider ! Comment puis-je vous assister aujourd'hui ?",
        "C'est une excellente question. Laissez-moi vous aider avec ça.",
        "Je comprends votre préoccupation. Voici ce que je peux faire pour vous.",
        "Merci pour votre question. Je vais vous fournir les informations nécessaires.",
      ];
      
      const aiResponse = responses[Math.floor(Math.random() * responses.length)];
      setTranscript(prev => [...prev, `IA: ${aiResponse}`]);
      speak(aiResponse);
    } catch (error) {
      console.error('Erreur support:', error);
      setTranscript(prev => [...prev, `IA: Désolé, une erreur est survenue.`]);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${isOpen ? '' : 'hidden'}`}>
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Support en Direct 🎙️
        </h2>

        <div className="mb-6 h-96 overflow-y-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
          {transcript.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
              <p className="text-center">
                Cliquez sur le bouton micro pour commencer à parler
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transcript.map((line, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-3 ${
                    line.startsWith('Vous:')
                      ? 'ml-8 bg-blue-500 text-white'
                      : 'mr-8 bg-green-500 text-white'
                  }`}
                >
                  <p className="font-medium">{line.split(':')[0]}</p>
                  <p>{line.split(':').slice(1).join(':').trim()}</p>
                </div>
              ))}
              <div ref={transcriptEndRef} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleListen}
            className={`flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 ${
              isListening
                ? 'animate-pulse bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
          </button>

          {isAiSpeaking && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="animate-bounce">🔊</span>
              <span>L'IA parle...</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {isListening ? 'Parlez maintenant...' : 'Appuyez sur le micro pour parler'}
        </p>
      </div>
    </div>
  );
};

export default LiveSupportModal;
