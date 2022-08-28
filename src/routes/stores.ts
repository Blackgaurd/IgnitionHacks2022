import { writable } from 'svelte-local-storage-store'
import type { sleepData } from './algorithm'

export const userAge = writable("userAge", 0)
export const userData = writable("userData", [] as sleepData[])
export const cycleLength = writable("cycleLength", 90)
export const dropdownId = writable("dropdownId", "sleep")
export const recommendedTimes = writable("recommendedTimes", [] as string[])
//export const enteredRating = writable("enteredRating", true)

export const carbonTheme = writable("__carbon-theme", "g10")