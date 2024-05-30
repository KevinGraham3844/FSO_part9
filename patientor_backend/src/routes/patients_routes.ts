import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../services/utils';
import toNewEntry from '../services/entryUtils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients()); 
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id)

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404)
    }
});

router.get('/:id/entries', (req, res) => {
    const patient = patientService.findById(req.params.id)

    if (patient) {
        res.send(patient.entries)
    } else {
        res.sendStatus(404)
    }
})

router.post('/:id/entries', (req, res) => {
    const patientId = req.params.id 
    const newEntry = toNewEntry(req.body)
    if (patientId) {
        try {
            const addedEntry = patientService.addEntry(newEntry, patientId)
            res.json(addedEntry)
        } catch (error: unknown) {
            let errorMessage = 'Something went wrong'
            if (error instanceof Error) {
                errorMessage += ' Error: ' + error.message
            }
            res.status(400).send(errorMessage)
        }
    } else {
        res.sendStatus(404)
    }
})

router.post('/', (req, res) => {

    try {
        const newPatientEntry = toNewPatientEntry(req.body)
        const addedPatient = patientService.addPatient(newPatientEntry)
        res.json(addedPatient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage)
    }
})

export default router;