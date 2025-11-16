import { X, Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { geminiService } from '../../services/gemini.service';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: any) => void;
}

const SearchModal = ({ isOpen, onClose, onSearch }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const filters = await geminiService.parseSearchQuery(query);
      onSearch(filters);
      onClose();
      setQuery('');
    } catch (error) {
      console.error('Erreur recherche:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-20">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Recherche Intelligente
        </h2>

        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ex: meilleurs intérimaires en marketing actifs avec plus de 4 étoiles..."
            className="w-full rounded-lg border border-gray-300 py-4 pl-12 pr-4 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            autoFocus
          />
        </div>

        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2 font-medium">Exemples de recherche:</p>
          <ul className="space-y-1">
            <li>• "développeurs React disponibles"</li>
            <li>• "intérimaires actifs avec plus de 4 étoiles"</li>
            <li>• "meilleurs designers UI/UX en mission"</li>
          </ul>
        </div>

        <button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="mt-6 w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {isSearching ? 'Recherche en cours...' : 'Rechercher'}
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
