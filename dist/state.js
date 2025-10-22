import { createInterface } from "readline";
import { command_exit } from "./command_exit.js";
import { command_help } from "./command_help.js";
import { command_map, command_mapb } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    const readInput = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const pokeAPI = new PokeAPI();
    const commands = {
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
        map: {
            name: "map",
            description: "Displays the list of location areas",
            callback: command_map
        },
        mapb: {
            name: "mapb",
            description: "Goes back a page when listing location areas",
            callback: command_mapb
        }
    };
    return {
        readInput,
        commands,
        pokeAPI,
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
}
