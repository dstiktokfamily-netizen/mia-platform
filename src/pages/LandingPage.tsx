import { ArrowRight, Star, Shield, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-2xl font-bold text-white">
              M
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">MIA</span>
          </div>
          <button
            onClick={() => navigate('/auth')}
            className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Connexion
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="mb-8 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          ✨ La révolution de l'intérim
        </div>
        
        <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl">
          La transparence au service
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            du marché de l'intérim
          </span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          MIA (Mercato Interim Agency) est la première plateforme de notation mutuelle 
          qui apporte transparence et confiance entre entreprises et travailleurs intérimaires.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate('/auth')}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Commencer maintenant
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-medium text-gray-700 transition-colors hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500">
            En savoir plus
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="rounded-3xl bg-white/70 p-12 shadow-xl backdrop-blur-sm dark:bg-gray-800/70">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Le problème
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Le marché de l'intérim manque cruellement de transparence
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-red-50 p-6 dark:bg-red-900/20">
              <div className="mb-3 text-3xl">😟</div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Pour les intérimaires
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Impossible de connaître la réputation d'une entreprise avant de s'engager
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-6 dark:bg-orange-900/20">
              <div className="mb-3 text-3xl">🤔</div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Pour les entreprises
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Difficile d'évaluer la qualité et la fiabilité des candidats
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-6 dark:bg-yellow-900/20">
              <div className="mb-3 text-3xl">❌</div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Résultat
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Méfiance, mauvaises expériences et perte de temps pour tous
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Notre solution
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Une plateforme de notation mutuelle alimentée par l'IA
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-gray-800/70">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-500 dark:bg-blue-900/30">
              <Star className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Notation Mutuelle
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Entreprises et intérimaires s'évaluent mutuellement après chaque mission
            </p>
          </div>

          <div className="group rounded-2xl bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-gray-800/70">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-500 dark:bg-green-900/30">
              <Shield className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Profils Vérifiés
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tous les profils sont vérifiés pour garantir authenticité et fiabilité
            </p>
          </div>

          <div className="group rounded-2xl bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-gray-800/70">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-500 dark:bg-purple-900/30">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Communauté Active
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rejoignez des milliers d'intérimaires et d'entreprises de confiance
            </p>
          </div>

          <div className="group rounded-2xl bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-gray-800/70">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-pink-100 text-pink-500 dark:bg-pink-900/30">
              <TrendingUp className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              IA Avancée
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Recherche intelligente et analyses prédictives pour mieux matcher
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 p-12 text-center text-white shadow-2xl">
          <h2 className="mb-4 text-4xl font-bold">
            Prêt à transformer votre expérience de l'intérim ?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Rejoignez MIA dès aujourd'hui et découvrez une nouvelle façon de travailler
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="rounded-lg bg-white px-8 py-4 text-lg font-medium text-blue-500 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Créer mon compte gratuitement
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 dark:border-gray-700">
        <div className="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 MIA - Mercato Interim Agency. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
