import { EntryFormValues, Diagnosis } from "../../types";
import { useState, SyntheticEvent } from 'react';
import { TextField, Button, Input } from "@mui/material";
import DiagnosisList from "./DiagnosisList";
interface HealthcheckProps {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues, id: string) => void;
    id: string
    diagnoses: Diagnosis[]
}

const OccupationalHealthCheckEntry = ({ onCancel, onSubmit, id, diagnoses }: HealthcheckProps) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [diagnosisCode, setDiagnosisCode] = useState('');

    const concatDiagnosis = (event: SyntheticEvent) => {
        event.preventDefault();
        if (diagnosisCodes.length === 0) {
            setDiagnosisCodes(diagnosisCode);
        } else {
            setDiagnosisCodes(diagnosisCodes + ', ' + diagnosisCode);
        }
        
    };


    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log('button Clicked');
        
        const diagnosisArray = diagnosisCodes.replace(/\s/g, '').split(',');
        onSubmit({
            date: date,
            description: description,
            specialist: specialist,
            type: "OccupationalHealthcare",
            employerName: employerName,
            sickLeave: {
                startDate: startDate,
                endDate: endDate
            },
            diagnosisCodes: diagnosisArray
        }, id);
        setDate('');
        setDescription('');
        setSpecialist('');
        setDiagnosisCodes('');
        setEmployerName('');
        setStartDate('');
        setEndDate('');
        onCancel();
    };
    return (
        <div>
            <h4>New Occupational Healthcare Entry</h4>
            <form>
               <Input
                type="date"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target.value)}
               />
               <TextField
                label="description"
                fullWidth
                value={description}
                onChange={({ target }) => setDescription(target.value)}
               />
                <TextField 
                label="specialist"
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
                />
                <TextField 
                label="employer name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
                />
                <b>Sick Leave</b>
                <Input 
                type="date"
                fullWidth
                value={startDate}
                onChange={({ target }) => setStartDate(target.value)}
                />
                <Input 
                type="date"
                fullWidth
                value={endDate}
                onChange={({ target }) => setEndDate(target.value)}
                />
                <DiagnosisList
                    diagnosisCodes={diagnosisCodes}
                    diagnosisCode={diagnosisCode}
                    setDiagnosisCode={setDiagnosisCode}
                    diagnoses={diagnoses}
                    concatDiagnosis={concatDiagnosis}
                />
                <Button
                onClick={onCancel}
                >cancel</Button>
                <Button
                onClick={addEntry}
                >
                    add
                </Button>
            </form>
        </div>
    );
};

export default OccupationalHealthCheckEntry;