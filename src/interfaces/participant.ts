import type { Hero } from "./heroes";

export interface Participant {
    hero:Hero,
    score:number,
    trialsWon: number[],
    position: number,
}

export interface resultTrialPentatlon {
    index: number, result:number
}