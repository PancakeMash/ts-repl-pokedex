import { type State } from "./state.js";
import {LocationArea} from "./pokeapi";

export async function command_explore(state: State, ...args1: string[]): Promise<void> {
    if (args1.length === 0) {
        console.log("Please provide an area to explore; Usage: explore <location>");
        return;
    }

    const location = args1[0];
    console.log(`Exploring ${location}...`)
    const locationArea = await state.pokeAPI.fetchLocation(location);

    console.log("Found Pokemon:");
    for (const encounter of locationArea.pokemon_encounters) {
        console.log(`- ${encounter.pokemon.name}`);
    }
}