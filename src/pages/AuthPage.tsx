import { Building2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleSelection = (role: 'entreprise' | 'interimaire') => {
    login(role);
    navigate('/app/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-3xl font-bold text-white">
            M
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            Bienvenue sur MIA
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choisissez votre rôle pour continuer
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Entreprise Card */}
          <button
            onClick={() => handleRoleSelection('entreprise')}
            className="group rounded-3xl bg-white/70 p-10 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-gray-800/70"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-blue-900/30">
              <Building2 className="h-10 w-10" />
            </div>
            
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Je suis une Entreprise
            </h2>
            
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Accédez à votre plateforme de gestion d'intérimaires, suivez vos missions
              et évaluez vos collaborateurs temporaires.
            </p>

            <ul className="space-y-2 text-left text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Recherchez des intérimaires qualifiés</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Gérez vos missions en temps réel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Consultez les évaluations et performances</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Analyses IA avancées</span>
              </li>
            </ul>

            <div className="mt-8 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600 transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-blue-900/30">
              Continuer en tant qu'Entreprise →
            </div>
          </button>

          {/* Intérimaire Card */}
          <button
            onClick={() => handleRoleSelection('interimaire')}
            className="group rounded-3xl bg-white/70 p-10 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-gray-800/70"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-100 text-purple-500 transition-colors group-hover:bg-purple-500 group-hover:text-white dark:bg-purple-900/30">
              <User className="h-10 w-10" />
            </div>
            
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Je suis un Intérimaire
            </h2>
            
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Accédez à votre profil professionnel, découvrez des missions et évaluez
              vos expériences avec les entreprises.
            </p>

            <ul className="space-y-2 text-left text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Trouvez les meilleures missions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Consultez la réputation des entreprises</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Suivez votre historique et vos notes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Développez votre profil professionnel</span>
              </li>
            </ul>

            <div className="mt-8 rounded-lg bg-purple-50 px-4 py-3 text-sm font-medium text-purple-600 transition-colors group-hover:bg-purple-500 group-hover:text-white dark:bg-purple-900/30">
              Continuer en tant qu'Intérimaire →
            </div>
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
