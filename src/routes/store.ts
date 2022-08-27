import { writable } from 'svelte/store';

const stored = localStorage.getItem("userAge");

export const enabled = writable(stored || 0);

enabled.subscribe((age) => localStorage.setItem("userAge", String(age)));
