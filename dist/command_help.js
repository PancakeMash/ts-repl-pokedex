export async function command_help(state) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage: \n");
    for (const cmd of Object.values(state.commands)) {
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}
