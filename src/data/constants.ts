export type UserRole = 'entreprise' | 'interimaire';

export interface Interimaire {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  status: 'Actif' | 'Inactif' | 'En mission';
  skills: string[];
  missionsCompleted: number;
  lastMission?: string;
  bio?: string;
}

export interface Entreprise {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  sector: string;
  address: string;
  description?: string;
  missionsPosted: number;
}

export interface Mission {
  id: string;
  title: string;
  entrepriseId: string;
  entrepriseName: string;
  interimaireId?: string;
  interimaireName?: string;
  status: 'active' | 'upcoming' | 'completed';
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  rate: string;
  skills: string[];
}

export interface Review {
  id: string;
  fromId: string;
  fromName: string;
  fromRole: UserRole;
  toId: string;
  toName: string;
  toRole: UserRole;
  rating: number;
  comment: string;
  missionId: string;
  missionTitle: string;
  date: string;
}

export interface Activity {
  id: string;
  type: 'review' | 'mission' | 'hire';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface PerformanceData {
  month: string;
  rating: number;
  missions: number;
}

// Intérimaires simulés
export const INTERIMAIRES: Interimaire[] = [
  {
    id: 'int-1',
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    phone: '06 12 34 56 78',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    rating: 4.8,
    reviewsCount: 24,
    status: 'Actif',
    skills: ['Marketing Digital', 'SEO', 'Réseaux Sociaux'],
    missionsCompleted: 24,
    lastMission: 'Campagne Facebook - TechCorp',
    bio: 'Spécialiste en marketing digital avec 5 ans d\'expérience'
  },
  {
    id: 'int-2',
    name: 'Lucas Dubois',
    email: 'lucas.dubois@email.com',
    phone: '06 23 45 67 89',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    rating: 4.6,
    reviewsCount: 18,
    status: 'En mission',
    skills: ['Développement Web', 'React', 'Node.js'],
    missionsCompleted: 18,
    lastMission: 'Développement Frontend - StartupX',
    bio: 'Développeur fullstack passionné'
  },
  {
    id: 'int-3',
    name: 'Emma Lefebvre',
    email: 'emma.lefebvre@email.com',
    phone: '06 34 56 78 90',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    rating: 4.9,
    reviewsCount: 32,
    status: 'Actif',
    skills: ['Design UI/UX', 'Figma', 'Adobe XD'],
    missionsCompleted: 32,
    lastMission: 'Refonte interface - FinanceApp',
    bio: 'Designer UI/UX créative et rigoureuse'
  },
  {
    id: 'int-4',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@email.com',
    phone: '06 45 67 89 01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
    rating: 4.3,
    reviewsCount: 12,
    status: 'Inactif',
    skills: ['Gestion de Projet', 'Scrum', 'Agile'],
    missionsCompleted: 12,
    lastMission: 'Project Manager - BuildCo',
    bio: 'Chef de projet agile certifié'
  },
  {
    id: 'int-5',
    name: 'Chloé Petit',
    email: 'chloe.petit@email.com',
    phone: '06 56 78 90 12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe',
    rating: 4.7,
    reviewsCount: 28,
    status: 'Actif',
    skills: ['Communication', 'Relations Publiques', 'Events'],
    missionsCompleted: 28,
    lastMission: 'Event Manager - LuxuryBrand',
    bio: 'Experte en communication et événementiel'
  },
  {
    id: 'int-6',
    name: 'Antoine Moreau',
    email: 'antoine.moreau@email.com',
    phone: '06 67 89 01 23',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Antoine',
    rating: 4.5,
    reviewsCount: 20,
    status: 'Actif',
    skills: ['Data Analysis', 'Python', 'SQL'],
    missionsCompleted: 20,
    lastMission: 'Data Analyst - RetailCorp',
    bio: 'Analyste de données spécialisé en retail'
  }
];

// Entreprises simulées
export const ENTREPRISES: Entreprise[] = [
  {
    id: 'ent-1',
    name: 'TechCorp Solutions',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
    rating: 4.5,
    reviewsCount: 45,
    sector: 'Technologie',
    address: '15 Avenue des Champs-Élysées, Paris',
    description: 'Leader européen des solutions technologiques',
    missionsPosted: 67
  },
  {
    id: 'ent-2',
    name: 'StartupX Innovation',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SX',
    rating: 4.2,
    reviewsCount: 28,
    sector: 'Startups',
    address: '42 Rue de la Paix, Lyon',
    description: 'Startup innovante en pleine croissance',
    missionsPosted: 34
  },
  {
    id: 'ent-3',
    name: 'FinanceApp Group',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FA',
    rating: 4.7,
    reviewsCount: 52,
    sector: 'Finance',
    address: '88 Boulevard Haussmann, Paris',
    description: 'Solutions financières digitales',
    missionsPosted: 89
  },
  {
    id: 'ent-4',
    name: 'BuildCo Construction',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BC',
    rating: 4.0,
    reviewsCount: 18,
    sector: 'Construction',
    address: '23 Route Nationale, Marseille',
    description: 'Construction et travaux publics',
    missionsPosted: 45
  }
];

// Missions simulées
export const MISSIONS: Mission[] = [
  {
    id: 'mis-1',
    title: 'Développeur Frontend React',
    entrepriseId: 'ent-1',
    entrepriseName: 'TechCorp Solutions',
    interimaireId: 'int-2',
    interimaireName: 'Lucas Dubois',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    description: 'Développement d\'une application web moderne avec React et TypeScript',
    location: 'Paris',
    rate: '450€/jour',
    skills: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'mis-2',
    title: 'Designer UI/UX',
    entrepriseId: 'ent-3',
    entrepriseName: 'FinanceApp Group',
    interimaireId: 'int-3',
    interimaireName: 'Emma Lefebvre',
    status: 'completed',
    startDate: '2023-11-01',
    endDate: '2023-12-31',
    description: 'Refonte complète de l\'interface utilisateur',
    location: 'Paris',
    rate: '400€/jour',
    skills: ['Figma', 'UI/UX', 'Design System']
  },
  {
    id: 'mis-3',
    title: 'Chef de Projet Digital',
    entrepriseId: 'ent-2',
    entrepriseName: 'StartupX Innovation',
    status: 'upcoming',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    description: 'Gestion de projet de transformation digitale',
    location: 'Lyon',
    rate: '500€/jour',
    skills: ['Gestion de Projet', 'Agile', 'Scrum']
  },
  {
    id: 'mis-4',
    title: 'Spécialiste Marketing Digital',
    entrepriseId: 'ent-1',
    entrepriseName: 'TechCorp Solutions',
    interimaireId: 'int-1',
    interimaireName: 'Sophie Martin',
    status: 'completed',
    startDate: '2023-10-01',
    endDate: '2023-12-15',
    description: 'Campagne marketing digitale multi-canal',
    location: 'Paris',
    rate: '380€/jour',
    skills: ['Marketing Digital', 'SEO', 'Google Ads']
  }
];

// Évaluations simulées
export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    fromId: 'ent-1',
    fromName: 'TechCorp Solutions',
    fromRole: 'entreprise',
    toId: 'int-1',
    toName: 'Sophie Martin',
    toRole: 'interimaire',
    rating: 5,
    comment: 'Excellente professionnelle ! Sophie a dépassé nos attentes avec sa campagne marketing. Très réactive et créative.',
    missionId: 'mis-4',
    missionTitle: 'Spécialiste Marketing Digital',
    date: '2023-12-20'
  },
  {
    id: 'rev-2',
    fromId: 'int-1',
    fromName: 'Sophie Martin',
    fromRole: 'interimaire',
    toId: 'ent-1',
    toName: 'TechCorp Solutions',
    toRole: 'entreprise',
    rating: 4,
    comment: 'Très bonne expérience globale. Équipe accueillante et projets intéressants. Un petit manque de clarté au début sur les objectifs.',
    missionId: 'mis-4',
    missionTitle: 'Spécialiste Marketing Digital',
    date: '2023-12-20'
  },
  {
    id: 'rev-3',
    fromId: 'ent-3',
    fromName: 'FinanceApp Group',
    fromRole: 'entreprise',
    toId: 'int-3',
    toName: 'Emma Lefebvre',
    toRole: 'interimaire',
    rating: 5,
    comment: 'Emma est exceptionnelle ! Son travail de refonte UI/UX a transformé notre application. Professionnalisme exemplaire.',
    missionId: 'mis-2',
    missionTitle: 'Designer UI/UX',
    date: '2024-01-05'
  },
  {
    id: 'rev-4',
    fromId: 'int-3',
    fromName: 'Emma Lefebvre',
    fromRole: 'interimaire',
    toId: 'ent-3',
    toName: 'FinanceApp Group',
    toRole: 'entreprise',
    rating: 5,
    comment: 'Entreprise fantastique ! Environnement de travail stimulant, équipe collaborative et respect des délais de paiement.',
    missionId: 'mis-2',
    missionTitle: 'Designer UI/UX',
    date: '2024-01-05'
  }
];

// Activités récentes
export const ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    type: 'review',
    title: 'Nouvelle évaluation',
    description: 'Sophie Martin a reçu 5 étoiles de TechCorp Solutions',
    timestamp: '2024-01-10T14:30:00',
    icon: '⭐'
  },
  {
    id: 'act-2',
    type: 'mission',
    title: 'Mission terminée',
    description: 'Designer UI/UX avec FinanceApp Group',
    timestamp: '2024-01-08T10:00:00',
    icon: '✅'
  },
  {
    id: 'act-3',
    type: 'hire',
    title: 'Nouvel engagement',
    description: 'Lucas Dubois a rejoint le projet React',
    timestamp: '2024-01-05T09:15:00',
    icon: '🤝'
  }
];

// Données de performance
export const PERFORMANCE_DATA: PerformanceData[] = [
  { month: 'Jan', rating: 4.2, missions: 8 },
  { month: 'Fév', rating: 4.4, missions: 10 },
  { month: 'Mar', rating: 4.5, missions: 12 },
  { month: 'Avr', rating: 4.6, missions: 11 },
  { month: 'Mai', rating: 4.7, missions: 13 },
  { month: 'Juin', rating: 4.8, missions: 15 }
];
