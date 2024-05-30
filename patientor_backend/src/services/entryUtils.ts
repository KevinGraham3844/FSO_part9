import { DiagnosisEntry, EntryWithoutId, HealthCheckRating } from "./types";
import { isDate, isString } from "./utils";

const isHealthCheck = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(h => h.toString()).includes(param.toString())
}

const isNum = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
}

const parseDescription = (description: unknown): string => {
    if(!isString(description)) {
        throw new Error('Incorrect or missing description')
    }
    return description
}

const parseDiagnosisCodes = (object: unknown):
Array<DiagnosisEntry['code']> => {
    console.log(object)
    console.log(typeof object)
    if(!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        console.log('if you got here and have a diagnosis code listed, somethings wrong')
        return [] as Array<DiagnosisEntry['code']>
    }
    console.log('here are the diagnosis codes', object.diagnosisCodes)
    return object.diagnosisCodes as Array<DiagnosisEntry['code']>
} 

const parseHealthCheck = (healthRating: unknown): number => {
    if (!isNum(healthRating) || !isHealthCheck(healthRating)) {
        throw new Error('Incorrect or missing health rating')
    }
    return healthRating
}

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date')
    }
    return date
}

const parseSpecialist = (specialist: unknown): string => {
    if(!isString(specialist)) {
        throw new Error('Incorrect or missing specialist')
    }
    return specialist
}

const parseDischargeDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing discharge date')
    }
    return date
}

const parseCriteria = (criteria: unknown): string => {
    if(!isString(criteria)) {
        throw new Error('Incorrect or missing criteria')
    }
    return criteria
}

const parseEmployer = (employer: unknown): string => {
    if(!isString(employer)) {
        throw new Error('Incorrect or missing employer information')
    }
    return employer
}


const toNewEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data')
    }
    if(
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "type" in object
    ) {        
        switch(object.type) {
            case "Hospital": {
                if ("discharge" in object && 
                    typeof object.discharge === 'object' && 
                    object.discharge &&
                    "date" in object.discharge &&
                    "criteria" in object.discharge
                ) {
                    const completedEntry: EntryWithoutId = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        type: "Hospital",
                        discharge: {
                            date: parseDischargeDate(object.discharge.date),
                            criteria: parseCriteria(object.discharge.criteria)
                        }
                    }
                    if("diagnosisCodes" in object) {
                        const updatedEntry: EntryWithoutId = {
                            diagnosisCodes: parseDiagnosisCodes(object),
                            ...completedEntry
                        }
                        return updatedEntry
                    }
                    return completedEntry
                }
                break;  
            }
            case "HealthCheck": {
                if ("healthCheckRating" in object) {
                    const completedEntry: EntryWithoutId = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        type: "HealthCheck",
                        healthCheckRating: parseHealthCheck(object.healthCheckRating)
                    }
                    if("diagnosisCodes" in object) {
                        const updatedEntry: EntryWithoutId = {
                            diagnosisCodes: parseDiagnosisCodes(object),
                            ...completedEntry
                        }
                        return updatedEntry
                    }
                    return completedEntry
                }
                break;
            }
            case "OccupationalHealthcare": {
                if ("employerName" in object) { 
                   if("sickLeave" in object &&
                    typeof object.sickLeave === 'object' &&
                    object.sickLeave &&
                    "startDate" in object.sickLeave &&
                    "endDate" in object.sickLeave
                   ) {
                    const completedEntry: EntryWithoutId = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        type: "OccupationalHealthcare",
                        specialist: parseSpecialist(object.specialist),
                        employerName: parseEmployer(object.employerName),
                        sickLeave: {
                            startDate: parseDate(object.sickLeave.startDate),
                            endDate: parseDate(object.sickLeave.endDate)
                        }
                    } 
                    if ("diagnosisCodes" in object) {
                        const updatedEntry: EntryWithoutId = {
                            diagnosisCodes: parseDiagnosisCodes(object),
                            ...completedEntry
                        }
                        return updatedEntry
                    } 
                    return completedEntry
                   } else {
                    const completedEntry: EntryWithoutId = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        type: "OccupationalHealthcare",
                        specialist: parseSpecialist(object.specialist),
                        employerName: parseEmployer(object.employerName),
                    }
                    if ("diagnosisCodes" in object) {
                        const updatedEntry: EntryWithoutId = {
                            diagnosisCodes: parseDiagnosisCodes(object),
                            ...completedEntry
                        }
                        return updatedEntry
                    } 
                    return completedEntry
                   }
                }
                break;
            }
            default: 
                throw new Error('Incorrect data: some fields are missing');
        }
    }
    throw new Error('Incorrect data: some fields are missing')
}



export default toNewEntry



