import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Appointment, Pet } from '../types';
import AppointmentForm from '../components/Calendar/AppointmentForm';
import AppointmentCard from '../components/Calendar/AppointmentCard';
import { getAppointments, addAppointment, updateAppointment, deleteAppointment, getPets } from '../lib/db';

export default function Calendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [loadedAppointments, loadedPets] = await Promise.all([
        getAppointments(),
        getPets()
      ]);
      setAppointments(loadedAppointments);
      setPets(loadedPets);
    } catch (err) {
      setError('Fehler beim Laden der Daten');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (appointmentData: Omit<Appointment, 'id'>) => {
    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment.id, appointmentData);
      } else {
        await addAppointment(appointmentData);
      }
      await loadData();
      setShowForm(false);
      setEditingAppointment(null);
    } catch (err) {
      setError('Fehler beim Speichern');
      console.error(err);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
      await loadData();
    } catch (err) {
      setError('Fehler beim Löschen');
      console.error(err);
    }
  };

  const getPetName = (petId: string) => {
    return pets.find((pet) => pet.id === petId)?.name || 'Unbekanntes Haustier';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kalender</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Termin hinzufügen
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
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

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Noch keine Termine</h3>
          <p className="mt-1 text-sm text-gray-500">
            Planen Sie Ihren ersten Termin, indem Sie auf den Button oben klicken.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                petName={getPetName(appointment.petId)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </div>
      )}

      {showForm && (
        <AppointmentForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingAppointment(null);
          }}
          pets={pets.map(({ id, name }) => ({ id, name }))}
          initialData={editingAppointment || undefined}
        />
      )}
    </div>
  );
}