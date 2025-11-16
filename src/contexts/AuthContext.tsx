import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { UserRole } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mia-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: role === 'entreprise' ? 'ent-1' : 'int-1',
      name: role === 'entreprise' ? 'TechCorp Solutions' : 'Sophie Martin',
      email: role === 'entreprise' ? 'contact@techcorp.com' : 'sophie.martin@email.com',
      role,
      avatar:
        role === 'entreprise'
          ? 'https://api.dicebear.com/7.x/initials/svg?seed=TC'
          : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    };
    setUser(mockUser);
    localStorage.setItem('mia-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mia-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
