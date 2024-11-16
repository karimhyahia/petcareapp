import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Clock, Image, Shield } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    { name: 'Meine Haustiere', href: '/app', icon: Home },
    { name: 'Kalender', href: '/app/calendar', icon: Calendar },
    { name: 'Fütterung', href: '/app/feeding', icon: Clock },
    { name: 'Galerie', href: '/app/gallery', icon: Image },
    { name: 'Versicherung', href: '/app/insurance', icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto md:flex ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 md:hidden">
          <span className="text-xl font-bold text-secondary-600">Menü</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <span className="sr-only">Schließen</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-400'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-secondary-600'
                }`}
                onClick={() => onClose()}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    isActive(item.href) ? 'text-primary-400' : 'text-gray-400'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}