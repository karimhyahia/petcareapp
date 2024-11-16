import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn } from 'lucide-react';

interface LoginFormProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onClose, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      onClose();
    } catch (error) {
      setError('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="text-center">
        <LogIn className="mx-auto h-12 w-12 text-primary-400" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Anmelden</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary"
        >
          {loading ? 'Wird angemeldet...' : 'Anmelden'}
        </button>
      </form>

      <div className="text-center text-sm">
        <p className="text-gray-600">
          Noch kein Konto?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary-400 hover:text-primary-500 font-medium"
          >
            Jetzt registrieren
          </button>
        </p>
      </div>
    </div>
  );
}