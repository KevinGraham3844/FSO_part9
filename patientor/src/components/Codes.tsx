import { Diagnosis } from "../types";

interface CodeProps {
    codes: string[];
    diagnoses: Diagnosis[];
}

const Codes = ({ codes, diagnoses } : CodeProps) => {
    const specificDiagnoses = diagnoses.filter(diagnosis => {
        const specificCode = codes.filter(code => code === diagnosis.code);
        if (specificCode.length !== 0) {
            return diagnosis;
        }
    });
    return (
        <ul>
            <h3>codes</h3>
            {specificDiagnoses.map((diagnosis) => (
                <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>
            ))}
        </ul>
    );
};

export default Codes;