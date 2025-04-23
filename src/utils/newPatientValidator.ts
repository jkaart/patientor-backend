import { z } from 'zod';
import { Gender, NewPatient } from '../types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.string().array(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default toNewPatient;
