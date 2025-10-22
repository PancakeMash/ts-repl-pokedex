import {createInterface} from "node:readline";

export function cleanInput(input: string):string[] {
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
        console.log("Your command was: " + cleanedInput[0]);
        readInput.prompt();
    });
}

