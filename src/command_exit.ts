import { type State } from "./state.js";

export async function command_exit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");
    state.readInput.close();
    process.exit(0);
}