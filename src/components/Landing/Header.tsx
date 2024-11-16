import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-primary-400" />
            <span className="text-xl font-bold text-secondary-600">Haustier-Manager</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Anmelden
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-400 rounded-md hover:bg-primary-500 transition-colors"
            >
              Kostenlos starten
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}