import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
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

const getPatient = (id: string): Patient | null => {
  const foundPatient = patients.find(patient => patient.id === id);
  return foundPatient ? foundPatient : null;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
};