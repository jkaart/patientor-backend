import { z } from 'zod';
import { HealthCheckRating } from './types';

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
});

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional()
});

const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
});

const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string()
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
  employerName: z.string().optional(),
  sickLeave: SickLeaveSchema.optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
  discharge: DischargeSchema.optional()
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const EntrySchema = z.union([HospitalEntrySchema, OccupationalHealthcareEntrySchema, HealthCheckEntrySchema]);

export const EntryWithoutIdSchema = z.union([
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
  HealthCheckEntrySchema.omit({ id: true })
]);

export const PatientBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.string(),
  occupation: z.string(),
});

const EntriesWithoutIdSchema = z.object({
  entries: z.array(EntryWithoutIdSchema)
});

const EntriesWithIdSchema = z.object({
  entries: z.array(EntrySchema)
});

export const PatientWithoutEntriesIdSchema = PatientBaseSchema.merge(EntriesWithoutIdSchema);

export const PatientSchema = PatientBaseSchema.merge(EntriesWithIdSchema);

export const NonSensitivePatientSchema = PatientSchema.omit({ ssn: true, entries: true });
export const NewPatientSchema = PatientSchema.omit({ id: true });

