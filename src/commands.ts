import { CLICommand } from "./command.js";
import { command_exit } from "./command_exit.js";
import { command_help } from "./command_help.js";


export function getCommands(): Record<string, CLICommand> {
    return {
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
}