import { X } from 'lucide-react';
import { useState } from 'react';
import { geminiService } from '../../services/gemini.service';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  targetRole: 'entreprise' | 'interimaire';
  missionTitle: string;
  onSubmit: (rating: number, comment: string) => void;
}

const RatingModal = ({
  isOpen,
  onClose,
  targetName,
  targetRole,
  missionTitle,
  onSubmit,
}: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateComment = async () => {
    if (rating === 0) {
      alert('Veuillez d\'abord attribuer une note');
      return;
    }

    setIsGenerating(true);
    try {
      const generated = await geminiService.generateReviewComment(
        targetName,
        missionTitle,
        rating
      );
      setComment(generated);
    } catch (error) {
      console.error('Erreur génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Veuillez attribuer une note');
      return;
    }
    if (!comment.trim()) {
      alert('Veuillez ajouter un commentaire');
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Évaluer {targetRole === 'entreprise' ? "l'entreprise" : "l'intérimaire"}
        </h2>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">{targetName}</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Mission: {missionTitle}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Note
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <span
                    className={`text-4xl ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Commentaire
              </label>
              <button
                type="button"
                onClick={handleGenerateComment}
                disabled={isGenerating || rating === 0}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin">⚙️</span>
                    Génération...
                  </>
                ) : (
                  <>
                    ✨ Générer avec l'IA
                  </>
                )}
              </button>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Décrivez votre expérience..."
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
            >
              Soumettre l'évaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
