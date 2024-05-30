import { Diagnosis, EntryFormValues } from "../../types";
import { useState, SyntheticEvent } from 'react';
import { TextField, Button, Input, InputLabel, Select, MenuItem } from "@mui/material";
import DiagnosisList from "./DiagnosisList";


interface HealthcheckProps {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues, id: string) => void;
    id: string
    diagnoses: Diagnosis[]
}

const HealthCheckEntry = ({ onCancel, onSubmit, id, diagnoses }: HealthcheckProps) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
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
        const numHealthRating = Number(healthCheckRating);
        const diagnosisArray = diagnosisCodes.replace(/\s/g, '').split(',');
        onSubmit({
            date: date,
            description: description,
            specialist: specialist,
            type: "HealthCheck",
            healthCheckRating: numHealthRating,
            diagnosisCodes: diagnosisArray
        }, id);
        setDate('');
        setDescription('');
        setSpecialist('');
        setHealthCheckRating('');
        setDiagnosisCodes('');
        onCancel();
    };

    return (
        <div>
            <h4>New Healthcheck Entry</h4>
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
                <InputLabel id="healthcheck-rating">
                    <b>Healthcheck Rating:</b>
                    <Select
                        value={healthCheckRating}
                        label="Healthcheck Rating"
                        onChange={({ target }) => setHealthCheckRating(target.value)}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </InputLabel>
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

export default HealthCheckEntry;