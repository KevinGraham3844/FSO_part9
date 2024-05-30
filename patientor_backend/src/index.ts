import express from 'express';
import diagnosesRouter from './routes/diagnoses_routes'
import patientRouter from './routes/patients_routes'

const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})