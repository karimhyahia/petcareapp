import React from 'react';
import { Pet } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (id: string) => void;
}

export default function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={pet.photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-secondary-600">{pet.name}</h3>
            <p className="text-sm text-gray-500">{pet.type}</p>
            <p className="text-sm text-gray-500">{pet.age} Jahre alt</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(pet)}
              className="p-1 text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="Bearbeiten"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(pet.id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              aria-label="Löschen"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}