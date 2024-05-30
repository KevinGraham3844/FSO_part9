import { exerciseCalculator } from "./exerciseCalculator";
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', (_req, res) => {
    res.send('Exercise Calculator')
})

app.post('/calculateExercise', (req, res) => {
    const {dailies, target } = req.body
    
    if (!dailies || dailies.every((day: any) => typeof day !== "number")) {
        return res.status(400).send({ error: 'malformatted parameters'})
    } 
    if (!target || isNaN(Number(target))) {
        return res.status(400).send({ error: 'malformatted parameters'})
    }
    const results = exerciseCalculator(dailies, target)
    console.log(results)
    res.send(results)
    return results
})
const PORT = 3003 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})