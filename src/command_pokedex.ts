import { type State } from "./state.js";

export async function command_pokedex(state: State): Promise<void> {
    const pokemon = state.pokemonCaught;
    if (Object.keys(pokemon).length === 0) {
        console.log("You have not caught any pokemon");
        return;
    }

    console.log("Your Pokedex:");
    for (const [name, poke] of Object.entries(pokemon)) {
        console.log(` - ${poke.name}`);
    }
}