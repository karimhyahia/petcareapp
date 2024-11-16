import React from 'react';
import { Appointment } from '../../types';
import { Calendar, Syringe, Stethoscope, Pencil, Trash2 } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
  petName: string;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

export default function AppointmentCard({ appointment, petName, onEdit, onDelete }: AppointmentCardProps) {
  const date = new Date(appointment.date);
  const formattedDate = date.toLocaleDateString('de-DE');
  const formattedTime = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          {appointment.type === 'vaccination' ? (
            <Syringe className="h-5 w-5 text-primary-400 mr-2" />
          ) : (
            <Stethoscope className="h-5 w-5 text-primary-400 mr-2" />
          )}
          <div>
            <h3 className="font-medium text-secondary-600">{appointment.title}</h3>
            <p className="text-sm text-gray-500">{petName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(appointment)}
            className="p-1 text-gray-400 hover:text-primary-400 transition-colors"
            aria-label="Bearbeiten"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(appointment.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Löschen"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center text-sm text-gray-500">
        <Calendar className="h-4 w-4 mr-1 text-primary-400" />
        <span>{formattedDate} um {formattedTime} Uhr</span>
      </div>
      {appointment.notes && (
        <p className="mt-2 text-sm text-gray-600">{appointment.notes}</p>
      )}
    </div>
  );
}