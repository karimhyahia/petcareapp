import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <PawPrint className="h-12 w-12 text-primary-400" />
          <div className="flex items-center space-x-2 text-gray-500">
            <span>Erstellt mit</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>für Ihre Haustiere</span>
          </div>
          <div className="flex space-x-4 text-sm text-gray-500">
            <Link to="/impressum" className="hover:text-gray-700">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-gray-700">Datenschutz</Link>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Haustier-Manager. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
}