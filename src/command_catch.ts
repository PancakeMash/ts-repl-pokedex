import { type State } from "./state.js";

export async function command_catch(state: State, ...args1: string[]): Promise<void> {
    if (args1.length === 0) {
        console.log("Please provide a Pokemon to catch; Usage: catch <pokemon>");
        return;
    }

    const pokemonName = args1[0];
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

    console.log(`Throwing a Pokeball at ${pokemon.name}...`);

    const difficulty = Math.min(1, pokemon.base_experience / 300);
    const chance = 0.7 - 0.5 * difficulty; // harder mons lower chance
    const NumChosen = 1 - Math.random();

    // console.log(chance);
    // console.log(`Chosen: ${NumChosen}`);

    if (NumChosen >= chance) {
        state.pokemonCaught[pokemonName] = pokemon;
        console.log(`${pokemon.name} was caught!`);
        return;
    }

    console.log(`${pokemon.name} escaped!`);
}