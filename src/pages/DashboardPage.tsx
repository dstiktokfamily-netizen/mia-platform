import { useAuth } from '../contexts/AuthContext';
import { 
  Star, 
  Briefcase, 
  TrendingUp, 
  Users,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import { INTERIMAIRES, MISSIONS, REVIEWS, ACTIVITIES, PERFORMANCE_DATA } from '../data/constants';
import RatingModal from '../components/modals/RatingModal';
import AnalysisModal from '../components/modals/AnalysisModal';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<any>(null);

  const isEntreprise = user?.role === 'entreprise';

  const handleOpenRating = (target: any) => {
    setSelectedTarget(target);
    setIsRatingModalOpen(true);
  };

  const handleSubmitRating = (rating: number, comment: string) => {
    console.log('New rating:', { rating, comment, target: selectedTarget });
    alert('Évaluation enregistrée avec succès !');
  };

  const chartData = {
    labels: PERFORMANCE_DATA.map(d => d.month),
    datasets: [
      {
        label: 'Note Moyenne',
        data: PERFORMANCE_DATA.map(d => d.rating),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 3.5,
        max: 5,
      },
    },
  };

  if (isEntreprise) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tableau de Bord Entreprise
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Vue d'ensemble de vos intérimaires et missions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Évaluations
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {REVIEWS.filter(r => r.fromRole === 'entreprise').length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-500 dark:bg-blue-900/30">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Missions Actives
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {MISSIONS.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-500 dark:bg-green-900/30">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Intérimaires Actifs
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {INTERIMAIRES.filter(i => i.status === 'Actif').length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-500 dark:bg-purple-900/30">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Note Moyenne
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  4.7
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-500 dark:bg-yellow-900/30">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Performance des Intérimaires
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Évolution des notes sur les 6 derniers mois
              </p>
            </div>
            <button
              onClick={() => setIsAnalysisModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600"
            >
              <TrendingUp className="h-4 w-4" />
              Analyser avec l'IA
            </button>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Activité Récente
            </h2>
            <div className="space-y-4">
              {ACTIVITIES.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xl dark:bg-blue-900/30">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Interimaires */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Derniers Intérimaires
            </h2>
            <div className="space-y-4">
              {INTERIMAIRES.slice(0, 4).map((interimaire) => (
                <div
                  key={interimaire.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={interimaire.avatar}
                      alt={interimaire.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {interimaire.name}
                      </p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {interimaire.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenRating(interimaire)}
                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    Évaluer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modals */}
        {selectedTarget && (
          <RatingModal
            isOpen={isRatingModalOpen}
            onClose={() => setIsRatingModalOpen(false)}
            targetName={selectedTarget.name}
            targetRole="interimaire"
            missionTitle="Mission en cours"
            onSubmit={handleSubmitRating}
          />
        )}

        <AnalysisModal
          isOpen={isAnalysisModalOpen}
          onClose={() => setIsAnalysisModalOpen(false)}
          data={PERFORMANCE_DATA}
          title="Analyse IA des Performances"
        />
      </div>
    );
  }

  // Intérimaire Dashboard
  const myReviews = REVIEWS.filter(r => r.toId === user?.id);
  const myMissions = MISSIONS.filter(m => m.interimaireId === user?.id);
  const avgRating = myReviews.length > 0
    ? (myReviews.reduce((acc, r) => acc + r.rating, 0) / myReviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mon Tableau de Bord
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Vue d'ensemble de votre activité et performances
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Note Moyenne
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {avgRating}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-500 dark:bg-yellow-900/30">
              <Star className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Missions Réalisées
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {myMissions.filter(m => m.status === 'completed').length}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-500 dark:bg-green-900/30">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                En cours
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {myMissions.filter(m => m.status === 'active').length}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-500 dark:bg-blue-900/30">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Évaluations Reçues
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {myReviews.length}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-500 dark:bg-purple-900/30">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Missions History */}
      <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Historique des Missions
        </h2>
        <div className="space-y-4">
          {myMissions.map((mission) => (
            <div
              key={mission.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {mission.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mission.entrepriseName}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  {mission.startDate} - {mission.endDate}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    mission.status === 'completed'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : mission.status === 'active'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {mission.status === 'completed' ? 'Terminée' : mission.status === 'active' ? 'Active' : 'À venir'}
                </span>
                {mission.status === 'completed' && (
                  <button
                    onClick={() => handleOpenRating({ name: mission.entrepriseName, id: mission.entrepriseId })}
                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    Évaluer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Modal */}
      {selectedTarget && (
        <RatingModal
          isOpen={isRatingModalOpen}
          onClose={() => setIsRatingModalOpen(false)}
          targetName={selectedTarget.name}
          targetRole="entreprise"
          missionTitle="Mission récente"
          onSubmit={handleSubmitRating}
        />
      )}
    </div>
  );
};

export default DashboardPage;
