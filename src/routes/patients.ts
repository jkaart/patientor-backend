import express, { Response, Request } from 'express';
import patientService from '../services/patientService';
import { newEntryParser, newPatientParser } from '../utils/middlewares';
import { EntryWithoutId, NewPatient, NonSensitivePatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (!patient) {
    res.status(404).json({ error: 'patient not found' });
    return;
  }
  res.json(patient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string; }, unknown, EntryWithoutId, unknown>, res: Response) => {
  const id = req.params.id;
  const addedEntry = patientService.addEntry(req.body, id);
  if (!addedEntry) {
    res.status(404).json({ error: 'patient not found' });
    return;
  }
  res.json(addedEntry);
});

export default router;