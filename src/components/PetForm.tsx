import React, { useState, useRef } from 'react';
import { Pet } from '../types';
import { X, Upload } from 'lucide-react';

interface PetFormProps {
  onSubmit: (pet: Omit<Pet, 'id'>) => void;
  onClose: () => void;
  initialData?: Pet;
}

export default function PetForm({ onSubmit, onClose, initialData }: PetFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || '',
    age: initialData?.age || 0,
    photoUrl: initialData?.photoUrl || '',
  });
  const [previewUrl, setPreviewUrl] = useState(initialData?.photoUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Dateigröße muss kleiner als 5MB sein');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, photoUrl: base64String });
        setPreviewUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-secondary-600">
            {initialData ? 'Haustier bearbeiten' : 'Neues Haustier hinzufügen'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="form-label">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Art</label>
            <input
              type="text"
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="form-input"
              placeholder="z.B. Hund, Katze, Vogel"
            />
          </div>

          <div>
            <label className="form-label">Alter</label>
            <input
              type="number"
              required
              min="0"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label mb-2">Foto</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-primary-400 transition-colors"
            >
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div className="max-w-full max-h-48 overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Vorschau"
                      className="max-h-48 mx-auto object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <span className="relative rounded-md font-medium text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-400">
                        Foto hochladen
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG bis zu 5MB</p>
                  </>
                )}
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

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
              {initialData ? 'Änderungen speichern' : 'Haustier hinzufügen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}