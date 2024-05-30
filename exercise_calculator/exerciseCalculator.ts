interface exerciseValues {
    days: number[];
    target: number;
}

const parseArguments = (args: string[]): exerciseValues => {
    if (args.length < 8) throw new Error('Not enough days, you need at least 5');
    let week : number[] = [];
    for (let i = 3; i < args.length; i++) {
        if(!isNaN(Number(args[i]))) {
            week.push(Number(args[i]));
        } else {
            throw new Error('all days must be a number');
        }
    }
    if (!isNaN(Number(args[2]))) {
        return {
            days: week,
            target: Number(args[2])
        }
    } else {
        throw new Error('target must be a number');
    }
}

export const exerciseCalculator = (days: number[], target: number) => {
    
    const average = days.reduce((a, b) => a + b, 0) / days.length;
    const trainingDays = days.filter(day => day !== 0).length;
    let ratingDescription = '';
    let rating = 0;
    let success = false;
    
    switch (true) {
        case average < (target - 2):
            ratingDescription = 'terrible performance this week';
            break;
        case average < (target - 1) && average > (target - 2):
            rating = 1;
            ratingDescription = 'Not great, but you did some training';
            break;
        case average < (target - 0.25) && average > (target - 1):
            rating = 2;
            ratingDescription = 'Pretty good, not at the goal yet';
            break;
        default: 
            rating = 3;
            ratingDescription = 'You succeeded in staying within a healthy range of your goals!';
            success = true;
    }

    return {
        periodLength: days.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
}

try {
    const { days, target } = parseArguments(process.argv)
    console.log(exerciseCalculator(days, target))
} catch (error: unknown) {
    let errorMessage = "Something bad happened"
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
}