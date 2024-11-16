import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FeedingSchedule } from '../../types';

interface FeedingFormProps {
  onSubmit: (schedule: Omit<FeedingSchedule, 'id'>) => void;
  onClose: () => void;
  pets: Array<{ id: string; name: string }>;
  initialData?: FeedingSchedule;
}

export default function FeedingForm({ onSubmit, onClose, pets, initialData }: FeedingFormProps) {
  const [formData, setFormData] = useState({
    petId: initialData?.petId || '',
    time: initialData?.time || '',
    portionSize: initialData?.portionSize || '',
    recurring: initialData?.recurring || false,
    daysOfWeek: initialData?.daysOfWeek || [],
  });

  const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  const handleDayToggle = (dayIndex: number) => {
    const currentDays = formData.daysOfWeek || [];
    const newDays = currentDays.includes(dayIndex)
      ? currentDays.filter((d) => d !== dayIndex)
      : [...currentDays, dayIndex];
    setFormData({ ...formData, daysOfWeek: newDays });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<FeedingSchedule, 'id'>);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-secondary-600">
            {initialData ? 'Fütterungszeit bearbeiten' : 'Neue Fütterungszeit'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="form-label">Haustier</label>
            <select
              required
              value={formData.petId}
              onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
              className="form-input"
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
            <label className="form-label">Uhrzeit</label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Portionsgröße</label>
            <input
              type="text"
              required
              value={formData.portionSize}
              onChange={(e) => setFormData({ ...formData, portionSize: e.target.value })}
              placeholder="z.B. 1 Tasse, 100g"
              className="form-input"
            />
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.recurring}
                onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                className="h-4 w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded"
              />
              <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
                Wiederkehrender Zeitplan
              </label>
            </div>
          </div>

          {formData.recurring && (
            <div>
              <label className="form-label mb-2">
                Wiederholen an
              </label>
              <div className="flex gap-2">
                {daysOfWeek.map((day, index) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(index)}
                    className={`px-2 py-1 rounded-full text-sm ${
                      formData.daysOfWeek?.includes(index)
                        ? 'bg-primary-400 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {initialData ? 'Änderungen speichern' : 'Fütterungszeit hinzufügen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}