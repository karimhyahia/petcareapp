import { 
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db, auth } from './firebase';
import type { Pet, Insurance, Appointment, FeedingSchedule, PhotoEntry } from '../types';

function getUserId() {
  const user = auth.currentUser;
  if (!user) throw new Error('User must be logged in');
  return user.uid;
}

// Pets
export async function getPets(): Promise<Pet[]> {
  const userId = getUserId();
  const q = query(collection(db, 'pets'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Pet));
}

export async function addPet(pet: Omit<Pet, 'id'>) {
  const userId = getUserId();
  return addDoc(collection(db, 'pets'), {
    ...pet,
    userId,
    createdAt: new Date().toISOString()
  });
}

export async function updatePet(id: string, pet: Partial<Pet>) {
  const docRef = doc(db, 'pets', id);
  await updateDoc(docRef, {
    ...pet,
    updatedAt: new Date().toISOString()
  });
}

export async function deletePet(id: string) {
  await deleteDoc(doc(db, 'pets', id));
}

// Appointments
export async function getAppointments(): Promise<Appointment[]> {
  const userId = getUserId();
  const q = query(collection(db, 'appointments'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Appointment));
}

export async function addAppointment(appointment: Omit<Appointment, 'id'>) {
  const userId = getUserId();
  return addDoc(collection(db, 'appointments'), {
    ...appointment,
    userId,
    createdAt: new Date().toISOString()
  });
}

export async function updateAppointment(id: string, appointment: Partial<Appointment>) {
  const docRef = doc(db, 'appointments', id);
  await updateDoc(docRef, {
    ...appointment,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteAppointment(id: string) {
  await deleteDoc(doc(db, 'appointments', id));
}

// Feeding Schedules
export async function getFeedingSchedules(): Promise<FeedingSchedule[]> {
  const userId = getUserId();
  const q = query(collection(db, 'feedingSchedules'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as FeedingSchedule));
}

export async function addFeedingSchedule(schedule: Omit<FeedingSchedule, 'id'>) {
  const userId = getUserId();
  return addDoc(collection(db, 'feedingSchedules'), {
    ...schedule,
    userId,
    createdAt: new Date().toISOString()
  });
}

export async function updateFeedingSchedule(id: string, schedule: Partial<FeedingSchedule>) {
  const docRef = doc(db, 'feedingSchedules', id);
  await updateDoc(docRef, {
    ...schedule,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteFeedingSchedule(id: string) {
  await deleteDoc(doc(db, 'feedingSchedules', id));
}

// Photos
export async function getPhotos(): Promise<PhotoEntry[]> {
  const userId = getUserId();
  const q = query(collection(db, 'photos'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as PhotoEntry));
}

export async function addPhoto(photo: Omit<PhotoEntry, 'id'>) {
  const userId = getUserId();
  return addDoc(collection(db, 'photos'), {
    ...photo,
    userId,
    createdAt: new Date().toISOString()
  });
}

export async function updatePhoto(id: string, photo: Partial<PhotoEntry>) {
  const docRef = doc(db, 'photos', id);
  await updateDoc(docRef, {
    ...photo,
    updatedAt: new Date().toISOString()
  });
}

export async function deletePhoto(id: string) {
  await deleteDoc(doc(db, 'photos', id));
}

// Insurance
export async function updateInsurance(petId: string, insurance: Insurance) {
  const docRef = doc(db, 'pets', petId);
  await updateDoc(docRef, {
    insurance,
    updatedAt: new Date().toISOString()
  });
}