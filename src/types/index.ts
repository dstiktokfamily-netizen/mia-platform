export type UserRole = 'entreprise' | 'interimaire';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  rating?: number;
  reviewsCount?: number;
}

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

export interface SearchFilter {
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minRating?: number;
  skills?: string[];
}
