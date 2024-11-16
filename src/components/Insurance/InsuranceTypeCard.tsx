import React from 'react';
import { Shield } from 'lucide-react';

interface InsuranceTypeCardProps {
  type: string;
  name: string;
  price: string;
  features: string[];
  isSelected?: boolean;
  onSelect: () => void;
}

export default function InsuranceTypeCard({
  type,
  name,
  price,
  features,
  isSelected,
  onSelect
}: InsuranceTypeCardProps) {
  return (
    <div
      className={`border rounded-lg p-6 transition-all ${
        isSelected
          ? 'border-primary-400 ring-2 ring-primary-400'
          : 'border-gray-200 hover:border-primary-400'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Shield className={`h-5 w-5 ${isSelected ? 'text-primary-400' : 'text-gray-400'}`} />
            <h3 className="text-lg font-medium text-secondary-600">{name}</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {price}
            <span className="text-sm font-normal text-gray-500"> / Monat</span>
          </p>
        </div>
        <button
          onClick={onSelect}
          className={`rounded-full p-2 ${
            isSelected
              ? 'bg-primary-400 text-white'
              : 'bg-gray-100 text-gray-400 hover:bg-primary-50 hover:text-primary-400'
          }`}
        >
          <div className="h-4 w-4 rounded-full border-2 flex items-center justify-center">
            {isSelected && <div className="h-2 w-2 bg-white rounded-full" />}
          </div>
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-400 mr-2">✓</span>
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}