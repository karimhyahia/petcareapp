export interface Pet {
  id: string;
  name: string;
  type: string;
  age: number;
  photoUrl: string;
  insurance?: Insurance;
}

export interface Insurance {
  type: 'OP_SCHUTZ' | 'BASIS' | 'TOP' | 'PREMIUM';
  startDate: string;
  documentUrl?: string;
}

export interface Appointment {
  id: string;
  petId: string;
  title: string;
  date: string;
  type: 'vet' | 'vaccination';
  notes?: string;
}

export interface FeedingSchedule {
  id: string;
  petId: string;
  time: string;
  portionSize: string;
  recurring: boolean;
  daysOfWeek?: number[];
}

export interface PhotoEntry {
  id: string;
  petId: string;
  photoUrl: string;
  date: string;
  notes?: string;
}