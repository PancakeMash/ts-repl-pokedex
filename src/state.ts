import { createInterface, type Interface } from "readline";
import { command_exit } from "./command_exit.js";
import { command_help } from "./command_help.js";


export function initState(): State {
    const readInput = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    const commands: Record<string, CLICommand> = {
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: command_exit,
        },
        help: {
            name: "help",
            description: "Displays help information",
            callback: command_help
        },
    };

    return {readInput, commands};

}

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State) => void,
};

export type State = {
    readInput: Interface,
    commands: Record<string, CLICommand>,
}
