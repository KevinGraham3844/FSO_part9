import { EntryFormValues, Diagnosis } from "../../types";
import { useState, SyntheticEvent } from 'react';
import { TextField, Button, Input } from "@mui/material";
import DiagnosisList from "./DiagnosisList";

interface HealthcheckProps {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues, id: string) => void;
    id: string,
    diagnoses: Diagnosis[]
}

const HospitalForm = ({ onCancel, onSubmit, id, diagnoses }: HealthcheckProps) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');
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
            type: "Hospital",
            discharge: {
                date: date,
                criteria: criteria
            },
            diagnosisCodes: diagnosisArray
        }, id);
        setDate('');
        setDescription('');
        setSpecialist('');
        setDischargeDate('');
        setCriteria('');
        setDiagnosisCodes('');
        onCancel();
    };
    return (
        <div>
            <h4>New Hospital Entry</h4>
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
                <b>Discharge Information:</b>
                <Input 
                type="date"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                />
                <TextField 
                label="criteria"
                fullWidth
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
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

export default HospitalForm;