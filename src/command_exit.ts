import { CLICommand } from "./command.js";

export function command_exit(_commands: Record<string, CLICommand>):void {
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
}


