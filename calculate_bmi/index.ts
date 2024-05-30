import express from 'express';
import { CalculateBmi } from './calculateBmi';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const result = CalculateBmi(height, weight);
    console.log(result);
    if (result.error) {
        res.send(`error: ${result.error}`);
    }
    res.send(`Your height is ${height}, your weight is ${weight}. Your BMI is ${result.bmi}`);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

