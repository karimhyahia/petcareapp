import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Insurance } from '../../types';
import InsuranceTypeCard from './InsuranceTypeCard';

interface InsuranceFormProps {
  onSubmit: (insurance: Omit<Insurance, 'documentUrl'>) => void;
  onClose: () => void;
  initialData?: Insurance;
}

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

export default function InsuranceForm({ onSubmit, onClose, initialData }: InsuranceFormProps) {
  const [selectedType, setSelectedType] = useState<keyof typeof INSURANCE_TYPES>(
    initialData?.type || 'OP_SCHUTZ'
  );
  const [startDate, setStartDate] = useState(
    initialData?.startDate || new Date().toISOString().split('T')[0]
  );

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: selectedType,
      startDate,
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full my-8">
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Versicherung bearbeiten' : 'Neue Versicherung hinzufügen'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Schließen"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Versicherungstarif auswählen
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(INSURANCE_TYPES).map(([type, details]) => (
                  <InsuranceTypeCard
                    key={type}
                    type={type}
                    name={details.name}
                    price={details.price}
                    features={details.features}
                    isSelected={selectedType === type}
                    onSelect={() => setSelectedType(type as keyof typeof INSURANCE_TYPES)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Versicherungsbeginn</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="sticky bottom-0 bg-white pt-6 mt-6 border-t">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                {initialData ? 'Änderungen speichern' : 'Versicherung hinzufügen'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}