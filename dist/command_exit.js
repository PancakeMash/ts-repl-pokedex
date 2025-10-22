export async function command_exit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    state.readInput.close();
    process.exit(0);
}
