import { NewPatientEntry, Gender } from "./types";

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param)
}

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name')
    }
    return name
}

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth ' + dateOfBirth)
    }
    return dateOfBirth
}

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing SSN')
    }
    return ssn
}

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender
}

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation')
    }
    return occupation
}

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }

    if(
        'name' in object && 
        'dateOfBirth' in object && 
        'ssn' in object && 
        'gender' in object && 
        'occupation' in object
    ) {
        const newPatient: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };
        return newPatient
    }
    throw new Error('Incorrect data: some fields are missing')
}

export default toNewPatientEntry