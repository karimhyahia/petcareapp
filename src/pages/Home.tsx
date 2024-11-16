import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import PetCard from '../components/PetCard';
import PetForm from '../components/PetForm';
import { Pet } from '../types';
import { getPets, addPet, updatePet, deletePet } from '../lib/db';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPets();
  }, []);

  async function loadPets() {
    try {
      const loadedPets = await getPets();
      setPets(loadedPets);
    } catch (err) {
      setError('Fehler beim Laden der Haustiere');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (petData: Omit<Pet, 'id'>) => {
    try {
      if (editingPet) {
        await updatePet(editingPet.id, petData);
      } else {
        await addPet(petData);
      }
      await loadPets();
      setShowForm(false);
      setEditingPet(null);
    } catch (err) {
      setError('Fehler beim Speichern');
      console.error(err);
    }
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePet(id);
      await loadPets();
    } catch (err) {
      setError('Fehler beim Löschen');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-600">Meine Haustiere</h1>
          <p className="mt-2 text-sm text-gray-600">Verwalten Sie die Profile Ihrer Haustiere und behalten Sie deren Informationen im Überblick.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-400 rounded-md hover:bg-primary-500 shadow-sm transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Haustier hinzufügen
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {pets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="mt-2 text-sm font-semibold text-secondary-600">Noch keine Haustiere</h3>
          <p className="mt-1 text-sm text-gray-500">
            Fügen Sie Ihr erstes Haustier hinzu.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-primary-400 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Erstes Haustier hinzufügen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <PetForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingPet(null);
          }}
          initialData={editingPet || undefined}
        />
      )}
    </div>
  );
}