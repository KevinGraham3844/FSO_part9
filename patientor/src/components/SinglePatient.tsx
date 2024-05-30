import { Patient, EntryFormValues, Entry, Diagnosis } from "../types";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { useState, useEffect } from "react";

import EntryDetails from "./EntryDetails";
import Codes from "./Codes";
import HealthCheckEntry from "./forms/HealthCheckEntry";
import OccupationalHealthCheckEntry from "./forms/OccupationalHealthCheckEntry";
import HospitalForm from "./forms/HospitalForm";


import { Button } from "@mui/material";
import axios from 'axios';

interface Props {
    patients : Patient[]
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const SinglePatient = ({ patients, setPatients } : Props) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [healthCheckForm, setHealthCheckForm] = useState('');
    const [OccupationalHealthForm, setOccupationalHealthForm] = useState('');
    const [HospitalEntry, setHospitalEntry] = useState('');
    const [error, setError] = useState<string>();
    const [entries, setEntries] = useState<Entry[]>([]);

    const id = useParams().id;
    const patient = patients.find(patient => patient.id === id);
    
    
    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnosisList = await patientService.getDiagnoses();
            setDiagnoses(diagnosisList);
        };
        void fetchDiagnoses();
        
    }, []);

    useEffect(() => {
        const fetchEntries = async () => {
            const entriesList = await patientService.getEntries(id!);
            setEntries(entriesList);
        };
        void fetchEntries();
    }, [id]);

    
    console.log(patient);
    if (!patient) {
        return null;
    }
    

    const closeForm = (): void => {
        setHealthCheckForm('');
        setOccupationalHealthForm('');
        setHospitalEntry('');
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues, id: string) => {
        try {
          const entry = await patientService.createEntry(values, id);
          const newPatients = patients.map(patient => {
            if (patient.id === id) {
              patient.entries.concat(entry);
            }
            return patient;
          });
          setPatients(newPatients);
          setEntries([...entries, entry]);
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.log(message);
                if(message.includes('Incorrect or missing date')) {
                    setError('Incorrect or missing date');
                    setInterval(() => {
                        setError('');
                    }, 5000);
                } else if (message.includes('Incorrect or missing health rating')) {
                    setError('Incorrect or missing health rating');
                    setInterval(() => {
                        setError('');
                    }, 5000);
                } else {
                    setError('Some fields are missing');
                    setInterval(() => {
                        setError('');
                    }, 5000);
                }
                console.log(message.includes('Incorrect or missing date'));
                
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      };
    console.log(patients);
    return (
        <div> 
            {error}
            <h2>{patient.name}</h2>
            <div>ssh: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <div>
                <div></div>
                <Button onClick={() => setHealthCheckForm('clicked')}>add Healthcheck Entry</Button>
                <div></div>
                <Button onClick={() => setOccupationalHealthForm('clicked')}>add Occupational Healthcare Entry</Button>
                <div></div>
                <Button onClick={() => setHospitalEntry('clicked')}>add Hospital Entry</Button>
            </div>
            <div>
                {healthCheckForm === 'clicked' ? <HealthCheckEntry diagnoses={diagnoses} onCancel={closeForm} onSubmit={submitNewEntry} id={id!}/> : null}
                {OccupationalHealthForm === 'clicked' ? <OccupationalHealthCheckEntry diagnoses={diagnoses} onCancel={closeForm} onSubmit={submitNewEntry} id={id!}/> : null}
                {HospitalEntry === 'clicked' ? <HospitalForm diagnoses={diagnoses} onCancel={closeForm} onSubmit={submitNewEntry} id={id!}/> : null}
            </div>
            <h3>entries</h3>
            {entries.map(entry => {
                if(!entry) {
                    return null;
                }
                return (
                    <div key={entry.id}>
                        <div>
                            <EntryDetails entry={entry} />
                        </div>
                        <div>
                            {entry.diagnosisCodes ? <Codes codes={entry.diagnosisCodes} diagnoses={diagnoses} /> : null}
                        </div>
                    </div>
                );
            })}
        </div>
    );

};



export default SinglePatient;