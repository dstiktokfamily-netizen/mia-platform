import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Star,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Building2,
  Search,
  TrendingUp,
  Shield,
  Smartphone,
  User,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import ConfirmModal from '../modals/ConfirmModal';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const entrepriseMenu = [
    { icon: LayoutDashboard, label: 'Tableau de Bord', path: '/app/dashboard' },
    { icon: Users, label: 'Intérimaires', path: '/app/interimaires' },
    { icon: Briefcase, label: 'Missions', path: '/app/missions' },
    { icon: TrendingUp, label: 'Performances', path: '/app/performances' },
    { icon: Star, label: 'Évaluations', path: '/app/evaluations' },
    { icon: FileText, label: 'Rapports', path: '/app/rapports' },
  ];

  const interimaireMenu = [
    { icon: LayoutDashboard, label: 'Tableau de Bord', path: '/app/dashboard' },
    { icon: Search, label: 'Rechercher Missions', path: '/app/missions' },
    { icon: Building2, label: 'Entreprises', path: '/app/entreprises' },
    { icon: Star, label: 'Mes Évaluations', path: '/app/evaluations' },
    { icon: FileText, label: 'Évaluations Données', path: '/app/evaluations-donnees' },
    { icon: User, label: 'Mon Profil', path: '/app/profil' },
  ];

  const bottomMenu = [
    { icon: Smartphone, label: 'Application Mobile', path: '/app/mobile' },
    { icon: Settings, label: 'Paramètres', path: '/app/settings' },
    { icon: Shield, label: 'Sécurité', path: '/app/security' },
    { icon: HelpCircle, label: 'Aide', path: '/app/help' },
  ];

  const menuItems = user?.role === 'entreprise' ? entrepriseMenu : interimaireMenu;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white/70 backdrop-blur-sm transition-transform duration-300 dark:border-gray-700 dark:bg-gray-800/70 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-xl font-bold text-white">
              M
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">MIA</span>
          </div>
          
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

          <div className="space-y-1">
            {bottomMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Déconnexion"
        cancelText="Annuler"
        type="warning"
      />
    </>
  );
};

export default Sidebar;
