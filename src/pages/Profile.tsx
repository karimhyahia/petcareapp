import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { updateProfile, updatePassword, deleteUser } from 'firebase/auth';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [name, setName] = useState(user?.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await updateProfile(user, {
        displayName: name
      });

      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      setSuccess('Profil erfolgreich aktualisiert');
      setNewPassword('');
    } catch (error: any) {
      setError(error.message || 'Fehler beim Aktualisieren des Profils');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError('');
      await deleteUser(user);
      navigate('/login');
    } catch (error: any) {
      setError(error.message || 'Fehler beim Löschen des Kontos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4 mb-8">
        <Settings className="h-8 w-8 text-primary-400" />
        <h1 className="text-2xl font-bold text-gray-900">Profileinstellungen</h1>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleUpdateProfile} className="space-y-6 p-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-Mail Adresse
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              Neues Passwort
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              Leer lassen, wenn das Passwort nicht geändert werden soll
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Wird gespeichert...' : 'Änderungen speichern'}
            </button>
          </div>
        </form>

        <div className="border-t border-gray-200 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-red-600">Gefahrenzone</h3>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn-danger"
              >
                Konto löschen
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Sind Sie sicher? Diese Aktion kann nicht rückgängig gemacht werden.
                  Alle Ihre Daten werden unwiderruflich gelöscht.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="btn-danger"
                  >
                    {loading ? 'Wird gelöscht...' : 'Ja, Konto endgültig löschen'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="btn-outline"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}