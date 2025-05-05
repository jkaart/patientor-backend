import { z } from 'zod';
import {
  DiagnosisSchema,
  EntrySchema,
  EntryWithoutIdSchema,
  NewPatientSchema,
  NonSensitivePatientSchema,
  PatientSchema,
  PatientWithoutEntriesIdSchema } from './schemas';

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NewPatient = z.infer< typeof NewPatientSchema>;
export type NonSensitivePatient = z.infer< typeof NonSensitivePatientSchema>;
export type EntryWithoutId = z.infer< typeof EntryWithoutIdSchema>;
export type Patient = z.infer<typeof PatientSchema>;
export type PatientWithoutEntriesId = z.infer<typeof PatientWithoutEntriesIdSchema>;
export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export type Entry = z.infer<typeof EntrySchema>;
