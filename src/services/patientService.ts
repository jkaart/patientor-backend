import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient, PatientWithoutEntriesId, EntryWithoutId, Entry } from '../types';
import { NonSensitivePatientSchema, PatientSchema, PatientWithoutEntriesIdSchema } from '../schemas';
import { z } from 'zod';

const getPatients = (): Patient[] => {
  return z.array(PatientSchema).parse(patients);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return z.array(NonSensitivePatientSchema).parse(patients);
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient: Patient = {
    id,
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): PatientWithoutEntriesId | null => {
  const foundPatient = patients.find(patient => patient.id === id);
  if (!foundPatient) {
    return null;
  }
  return PatientWithoutEntriesIdSchema.parse(foundPatient);
};

const getPatientWithEntriesId = (id: string): Patient | null => {
  const foundPatient = patients.find(patient => patient.id === id);
  if (!foundPatient) {
    return null;
  }
  return PatientSchema.parse(foundPatient);
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry | null => {
  const foundPatient = getPatientWithEntriesId(patientId);
  if (foundPatient) {
    const id = uuid();
    const entryWithId = { id, ...entry };
    patients.map(p => p.id === patientId ? p.entries.push(entryWithId) : p);
    return entryWithId;
  }
  return null;

};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry,
};