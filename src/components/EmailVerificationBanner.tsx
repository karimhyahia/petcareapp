import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { resendVerificationEmail } from '../lib/auth';

export default function EmailVerificationBanner() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user || user.emailVerified) return null;

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await resendVerificationEmail(user);
      setSuccess('Verifizierungs-E-Mail wurde erneut gesendet');
    } catch (error: any) {
      setError(error.message || 'Fehler beim Senden der Verifizierungs-E-Mail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-50 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-amber-100">
              <svg className="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            <p className="ml-3 font-medium text-amber-600 truncate">
              <span className="hidden md:inline">
                Bitte bestätigen Sie Ihre E-Mail-Adresse, um alle Funktionen nutzen zu können.
              </span>
            </p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3">
            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-amber-600 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {loading ? 'Wird gesendet...' : 'Verifizierungs-E-Mail erneut senden'}
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        {success && (
          <p className="mt-2 text-sm text-green-600">{success}</p>
        )}
      </div>
    </div>
  );
}