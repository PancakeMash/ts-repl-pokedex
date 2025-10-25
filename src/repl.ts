import { type State, initState } from "./state.js";


export function cleanInput(input: string):string[] {
    if (input.trim().length === 0) {
        return [];
    }

    return input.trim().toLowerCase().split(" ");
}

export function startREPL() {
    const state: State = initState();

    state.readInput.prompt();

    state.readInput.on("line", async (input) => {
        const cleaned = cleanInput(input);
        if (cleaned.length === 0) {
            state.readInput.prompt();
            return;
        }

        const cmdName = cleaned[0];
        const args = cleaned.slice(1);
        const cmd = state.commands[cmdName];

        if (!cmd) {
            console.log("Unknown command");
            state.readInput.prompt();
            return;
        }

        try {
            await cmd.callback(state, ...args);
        } catch (err) {
            console.log(err);
        }

        state.readInput.prompt();
    });
}