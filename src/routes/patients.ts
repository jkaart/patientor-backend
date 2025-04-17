import express, { Response, Request } from 'express';
import patientService from '../services/patientService';
import { newPatientParser } from '../utils/middlewares';
import { NewPatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

export default router;