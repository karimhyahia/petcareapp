import React, { useState, useEffect, useRef } from 'react';
import { Pet, Insurance as InsuranceType } from '../types';
import { Shield, Upload, ExternalLink, Plus } from 'lucide-react';
import InsuranceForm from '../components/Insurance/InsuranceForm';
import { getPets, updateInsurance } from '../lib/db';

const INSURANCE_TYPES = {
  OP_SCHUTZ: {
    name: 'OP-Schutz',
    price: '18,28€',
    features: [
      'Versicherungskarte',
      'Keine Begrenzung auf eine Jahres-Höchstersatzleistung bei Operationen',
      'Untersuchungen der Operationsvorbereitung',
      'bis zu 120 Tage Nachbehandlung',
      'Täglich kündigen nach 1 Jahr Vertragslaufzeit',
    ]
  },
  BASIS: {
    name: 'Basis',
    price: '35,93€',
    features: [
      'Alles aus dem OP-Schutz inklusive',
      'Ambulante Kosten mitversichert 400€ jährl.',
      'Kostenerstattung bis zum 4-fachen GOT-Satz',
      'Täglich kündigen',
      'Notdienstgebühr',
    ]
  },
  TOP: {
    name: 'Top',
    price: '43,96€',
    features: [
      'Alles aus dem OP-Schutz inklusive',
      'Ambulante Kosten mitversichert 800€ jährl.',
      'Kostenerstattung bis zum 4-fachen GOT-Satz',
      'Täglich kündigen',
      'Notdienstgebühr',
    ]
  },
  PREMIUM: {
    name: 'Premium',
    price: '67,07€',
    features: [
      'Alles aus dem OP-Schutz inklusive',
      'Ambulante Kosten mitversichert unbegrenzt',
      'Kostenerstattung bis zum 4-fachen GOT-Satz',
      'Täglich kündigen',
      'Notdienstgebühr',
    ]
  }
};

export default function InsurancePage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const loadedPets = await getPets();
      setPets(loadedPets);
    } catch (err) {
      setError('Fehler beim Laden der Daten');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleInsuranceUpdate = async (petId: string, insurance: InsuranceType) => {
    try {
      await updateInsurance(petId, insurance);
      await loadData();
    } catch (err) {
      setError('Fehler beim Speichern der Versicherung');
      console.error(err);
    }
  };

  const handleFileUpload = async (petId: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('Dateigröße muss kleiner als 5MB sein');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const pet = pets.find(p => p.id === petId);
        if (pet?.insurance) {
          await handleInsuranceUpdate(petId, {
            ...pet.insurance,
            documentUrl: reader.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Fehler beim Hochladen der Datei');
      console.error(err);
    }
  };

  const selectedPetData = pets.find(pet => pet.id === selectedPet);

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
          <h1 className="text-3xl font-bold text-gray-900">Versicherung</h1>
          <p className="mt-2 text-sm text-gray-600">
            Verwalten Sie die Versicherungsinformationen Ihrer Haustiere
          </p>
        </div>
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

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Haustier auswählen</label>
          <select
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Bitte wählen Sie ein Haustier</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>{pet.name}</option>
            ))}
          </select>
        </div>

        {selectedPet && selectedPetData && (
          <div className="space-y-6">
            {!selectedPetData.insurance ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <Shield className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Keine Versicherung</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Schützen Sie Ihr Haustier mit einer Versicherung
                </p>
                <div className="mt-6 space-x-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Versicherung hinzufügen
                  </button>
                  <a
                    href="https://dogcare24.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Mehr Informationen
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Aktuelle Versicherung</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tarif</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {INSURANCE_TYPES[selectedPetData.insurance.type].name} - {INSURANCE_TYPES[selectedPetData.insurance.type].price}/Monat
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Beginn</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedPetData.insurance.startDate).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowForm(true)}
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Bearbeiten
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900">Leistungen</h4>
                  <ul className="mt-2 space-y-2">
                    {INSURANCE_TYPES[selectedPetData.insurance.type].features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Vertragsunterlagen</h4>
                  {selectedPetData.insurance.documentUrl ? (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span className="text-sm text-gray-600">Dokument hochgeladen</span>
                      <button
                        onClick={() => window.open(selectedPetData.insurance?.documentUrl)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        Anzeigen
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-indigo-500"
                    >
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">Vertragsunterlagen hochladen</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(selectedPet, file);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showForm && selectedPet && (
        <InsuranceForm
          onSubmit={(insurance) => {
            handleInsuranceUpdate(selectedPet, insurance);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
          initialData={selectedPetData?.insurance}
        />
      )}
    </div>
  );
}