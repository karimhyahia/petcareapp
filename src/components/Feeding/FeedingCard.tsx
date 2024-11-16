import React from 'react';
import { FeedingSchedule } from '../../types';
import { Clock, Pencil, Trash2 } from 'lucide-react';

interface FeedingCardProps {
  schedule: FeedingSchedule;
  petName: string;
  onEdit: (schedule: FeedingSchedule) => void;
  onDelete: (id: string) => void;
}

export default function FeedingCard({ schedule, petName, onEdit, onDelete }: FeedingCardProps) {
  const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-primary-400 mr-2" />
            <h3 className="font-medium text-secondary-600">{schedule.time} Uhr</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">{petName}</p>
          <p className="text-sm font-medium text-gray-700 mt-2">
            Portion: {schedule.portionSize}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(schedule)}
            className="p-1 text-gray-400 hover:text-primary-400 transition-colors"
            aria-label="Bearbeiten"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(schedule.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Löschen"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {schedule.recurring && schedule.daysOfWeek && (
        <div className="mt-3 flex flex-wrap gap-1">
          {daysOfWeek.map((day, index) => (
            <span
              key={day}
              className={`text-xs px-2 py-1 rounded-full ${
                schedule.daysOfWeek?.includes(index)
                  ? 'bg-primary-50 text-primary-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {day}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}