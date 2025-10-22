import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
export function cleanInput(input) {
    if (input.trim().length === 0) {
        return [];
    }
    return input.trim().toLowerCase().split(" ");
}
export function startREPL() {
    const readInput = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    readInput.prompt();
    readInput.on("line", (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            readInput.prompt();
            return;
        }
        const commands = getCommands();
        const command = cleanedInput[0];
        const commandToExecute = commands[command];
        if (commandToExecute === undefined) {
            console.log("Unknown command");
            readInput.prompt();
        }
        try {
            commandToExecute.callback(commands);
        }
        catch (error) {
            console.log(error);
        }
        readInput.prompt();
    });
}
