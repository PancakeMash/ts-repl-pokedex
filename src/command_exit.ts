import { type State } from "./state.js";

export function command_exit(state: State): void {
    console.log("Closing the Pokedex... Goodbye!");
    state.readInput.close();
    process.exit(0);
}