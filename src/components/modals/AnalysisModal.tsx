import { X } from 'lucide-react';
import { geminiService } from '../../services/gemini.service';
import { useState } from 'react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  title: string;
}

const AnalysisModal = ({ isOpen, onClose, data, title }: AnalysisModalProps) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await geminiService.analyzePerformance(data);
      setAnalysis(result);
      setHasAnalyzed(true);
    } catch (error) {
      console.error('Erreur analyse:', error);
      setAnalysis('Une erreur est survenue lors de l\'analyse.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    setAnalysis('');
    setHasAnalyzed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <div className="space-y-6">
          {!hasAnalyzed ? (
            <div className="text-center">
              <div className="mb-6 text-6xl">🤖</div>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Utilisez l'intelligence artificielle pour analyser vos données de performance
                et obtenir des insights précieux.
              </p>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⚙️</span>
                    Analyse en cours...
                  </span>
                ) : (
                  '✨ Lancer l\'analyse IA'
                )}
              </button>
            </div>
          ) : (
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:from-gray-700 dark:to-gray-600">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Analyse IA
                </h3>
              </div>
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-200">
                {analysis}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
