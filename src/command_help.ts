import {CLICommand} from "./command";


export function command_help(commands: Record<string, CLICommand>):void {
    console.log("Welcome to the Pokedex!");
    console.log("Usage: \n");

    for (const cmd of Object.values(commands)) {
        console.log(`${cmd.name}: ${cmd.description}`);
    }

}