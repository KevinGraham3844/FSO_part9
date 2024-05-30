import { Diagnosis } from "../../types";
import { SyntheticEvent } from "react";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";

interface DiagnosisListProps {
    diagnosisCodes: string
    diagnosisCode: string
    diagnoses: Diagnosis[]
    concatDiagnosis: (event: SyntheticEvent) => void
    setDiagnosisCode: (value: React.SetStateAction<string>) => void
}

const DiagnosisList = ({ diagnosisCodes, diagnoses, concatDiagnosis, setDiagnosisCode, diagnosisCode }: DiagnosisListProps) => {

    return (
        <div>
            {diagnosisCodes}
            <InputLabel id="Diagnosis-List">Diagnosis Code</InputLabel>
                <Select
                    labelId="Diagnosis-List-label"
                    id="Diagnosis-List"
                    value={diagnosisCode}
                    label="diagnosis"
                    onChange={({ target }) => setDiagnosisCode(target.value)}
                >
                {diagnoses.map((diagnosis: Diagnosis) => (
                    <MenuItem value={diagnosis.code} key={diagnosis.code}>{diagnosis.code}</MenuItem>
                ))}
                </Select>
            <Button onClick={concatDiagnosis}>add diagnosis</Button>
            <div></div>
        </div>
    );
};

export default DiagnosisList;