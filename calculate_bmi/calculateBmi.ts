interface BmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error('usage: npm run caclulateBmi weight(Number: kg) height(Number: cm)');
    }
};

const bmiCalculator = (height: number, weight: number) => {
    const bmi = Math.round(((weight / ((height * height) / 10000)) * 10) / 10); 
    
    if (bmi <= 18.4) {
        console.log('Unhealthy (underweight)');
        return {
            weight: weight,
            height: height,
            bmi: `${bmi}: unhealthy (underweight)`
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        console.log('Normal (healthy weight)');
        return {
            weight: weight,
            height: height,
            bmi: `${bmi}: Normal (healthy weight)`
        };
    } else if (bmi >= 25 && bmi <= 29.9) {
        console.log('Unhealthy (overweight)');
        return {
            weight: weight,
            height: height,
            bmi: `${bmi}: Unhealthy (overweight)`
        };
    } else if (bmi >= 30) {
        console.log('Very Unhealthy (obese)');
        return {
            weight: weight,
            height: height,
            bmi: `${bmi}: Very Unhealthy (obese)`
        };
    } else return {
        error: "malformatted parameters"
    };
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    bmiCalculator(value1, value2);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if( error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export const CalculateBmi = bmiCalculator;