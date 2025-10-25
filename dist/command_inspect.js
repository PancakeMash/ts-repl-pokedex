export async function command_inspect(state, ...args1) {
    if (args1.length === 0) {
        console.log("Please provide a Pokemon to inspect; Usage: inspect <pokemon>");
        return;
    }
    const pokemonName = args1[0];
    const pokemon = state.pokemonCaught[pokemonName];
    if (!pokemon) {
        console.log("you have not caught that pokemon");
    }
    console.log("Name: " + pokemon.name);
    console.log("Height: " + pokemon.height);
    console.log("Weight: " + pokemon.weight);
    console.log("Stats:");
    for (const stats of pokemon.stats) {
        console.log(`  - ${stats.stat.name}: ${stats.base_stat}`);
    }
    console.log("Types:");
    for (const type of pokemon.types) {
        console.log(`  - ${type.type.name}`);
    }
}
