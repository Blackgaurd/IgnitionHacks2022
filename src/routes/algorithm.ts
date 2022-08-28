export type sleepData = {
    minutes: number;
    rating: number;
}

const MIN_DATA_LENGTH = 10;
const DEFAULT_CYCLE_LENGTH = 90;
const MIN_CYCLE_LENGTH = 85;
const MAX_CYCLE_LENGTH = 115;

export function findCycleLength(userData: sleepData[]): number {
    // user has too little data to confidently calculate cycle length
    // generalize cycle length to 90 minutes
    if (userData.length < MIN_DATA_LENGTH) return DEFAULT_CYCLE_LENGTH;

    let bestDif = Number.MAX_VALUE;
    let numCycle = 0; // cycle length

    for (let i = MIN_CYCLE_LENGTH; i <= MAX_CYCLE_LENGTH; i++) {
        let dif = 0;
        for (let j = 0; j < userData.length; j++) {
            let x = userData[j].minutes % i;
            if (x <= 5) {
                dif += Math.abs(8 - userData[j].rating);
            } else if (x > i - 10) {
                dif += Math.abs(9.5 - userData[j].rating);
            } else if (x <= 30) {
                dif += Math.abs(6 - userData[j].rating);
            } else {
                dif += Math.abs(3 - userData[j].rating);
            }
        }
        if (dif < bestDif) {
            bestDif = dif;
            numCycle = i;
        }
    }

    return numCycle;
}