import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Appointment } from '../../types';

interface AppointmentFormProps {
  onSubmit: (appointment: Omit<Appointment, 'id'>) => void;
  onClose: () => void;
  pets: Array<{ id: string; name: string }>;
  initialData?: Appointment;
}

export default function AppointmentForm({ onSubmit, onClose, pets, initialData }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    petId: initialData?.petId || '',
    title: initialData?.title || '',
    date: initialData?.date || '',
    type: initialData?.type || 'vet',
    notes: initialData?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Appointment, 'id'>);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-secondary-600">
            {initialData ? 'Termin bearbeiten' : 'Neuer Termin'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Haustier</label>
            <select
              required
              value={formData.petId}
              onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
            >
              <option value="">Haustier auswählen</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Titel</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Datum & Uhrzeit</label>
            <input
              type="datetime-local"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Typ</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'vet' | 'vaccination' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
            >
              <option value="vet">Tierarztbesuch</option>
              <option value="vaccination">Impfung</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notizen</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring-primary-400"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-400 rounded-md hover:bg-primary-500"
            >
              {initialData ? 'Änderungen speichern' : 'Termin hinzufügen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}