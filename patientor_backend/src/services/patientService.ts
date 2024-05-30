import patientData from '../../data/patients-full'

import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, EntryWithoutId, Entry } from './types'
import { v1 as uuid } from 'uuid'



const patients: PatientEntry[] = patientData

const getPatients = (): PatientEntry[] => {
    return patients
}

const findById = (id: string): PatientEntry | undefined => {
    const patient = patientData.find(data => data.id === id)
    return patient
}

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const generatedId = uuid()
    const newPatient = {
        id: generatedId,
        ...entry
    };
    patients.push(newPatient);
    return newPatient
}

const addEntry = ( entry: EntryWithoutId, id: string ): Entry => {
    const generatedId = uuid()
    const newEntry = {
        id: generatedId,
        ...entry
    };
    patients.map(patient => {
        if (patient.id === id) {
            patient.entries.push(newEntry)
        }
        return patient
    })
    return newEntry
}


const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
    getNonSensitivePatients,
    findById,
    addPatient,
    addEntry
};