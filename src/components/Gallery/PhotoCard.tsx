import React from 'react';
import { PhotoEntry } from '../../types';
import { Calendar, Pencil, Trash2 } from 'lucide-react';

interface PhotoCardProps {
  photo: PhotoEntry;
  petName: string;
  onEdit: (photo: PhotoEntry) => void;
  onDelete: (id: string) => void;
}

export default function PhotoCard({ photo, petName, onEdit, onDelete }: PhotoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={photo.photoUrl}
          alt={`Foto von ${petName}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-secondary-600">{petName}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Calendar className="h-4 w-4 mr-1 text-primary-400" />
              <span>{new Date(photo.date).toLocaleDateString('de-DE')}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(photo)}
              className="p-1 text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="Bearbeiten"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(photo.id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              aria-label="Löschen"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        {photo.notes && (
          <p className="mt-2 text-sm text-gray-600">{photo.notes}</p>
        )}
      </div>
    </div>
  );
}