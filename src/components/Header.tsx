import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Fehler beim Abmelden:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center gap-2 ml-2 md:ml-0">
              <PawPrint className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-secondary-600">Haustier-Manager</span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              {!user.emailVerified && (
                <span className="text-sm text-amber-600 hidden sm:inline">
                  E-Mail nicht verifiziert
                </span>
              )}
              <span className="text-sm text-gray-700 hidden sm:inline">
                Hallo, {user.displayName || 'Benutzer'}
              </span>
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-secondary-600 bg-white border border-secondary-200 rounded-md hover:bg-secondary-50"
              >
                <User className="h-4 w-4 mr-2" />
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Abmelden
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}