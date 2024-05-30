import { Entry } from '../types';
import Box from '@mui/material/Box';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface RatingProps {
    rating: number
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const RatingIcon = ({ rating } : RatingProps) => {
    switch (rating) {
        case 0:
            return <FavoriteIcon style={{ color: 'green' }} />;
        case 1:
            return <FavoriteIcon style={{ color: 'yellow' }} />;
        case 2: 
            return <FavoriteIcon style={{ color: 'yellow' }} />;
        default: 
            return <FavoriteIcon style={{ color: 'red' }}/>;
    }
};


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return (
                <div>
                    <Box m={2} pt={3} sx={{ border: 1 }}>
                    <div>
                        {entry.date} 
                        <LocalHospitalIcon />
                    </div>
                    <div>{entry.description}</div>
                    <div>diagnosed by {entry.specialist}</div>
                    <div>discharged: {entry.discharge.date}</div>
                    </Box>
                </div>
            );
        case 'OccupationalHealthcare': 
            return (
                <div>
                    <Box m={2} pt={3} sx={{ border: 1 }}>
                    <div>{entry.date}
                    <WorkIcon />
                    {entry.employerName}
                    </div>
                    <div>{entry.description}</div>
                    <div>diagnosed by: {entry.specialist}</div>
                    </Box>
                </div>
            );
        case 'HealthCheck': 
            return (
                <div>
                    <Box m={2} pt={3} sx={{ border: 1 }}>
                    <div>{entry.date} 
                    <MedicalServicesIcon />
                    </div>
                    <div>{entry.description}</div>
                    <div><RatingIcon rating={entry.healthCheckRating}/></div>
                    <div>diagnosed by: {entry.specialist}</div>
                    </Box>
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;