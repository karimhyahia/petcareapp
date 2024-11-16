import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus } from 'lucide-react';

interface RegisterFormProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onClose, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await register(email, password, name);
      onClose();
    } catch (error) {
      setError('Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="text-center">
        <UserPlus className="mx-auto h-12 w-12 text-primary-400" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Registrieren</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-Mail
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Passwort
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary"
        >
          {loading ? 'Wird registriert...' : 'Registrieren'}
        </button>
      </form>

      <div className="text-center text-sm">
        <p className="text-gray-600">
          Bereits registriert?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary-400 hover:text-primary-500 font-medium"
          >
            Jetzt anmelden
          </button>
        </p>
      </div>
    </div>
  );
}