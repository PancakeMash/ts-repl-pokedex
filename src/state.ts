import {PokeAPI, Pokemon} from "./pokeapi.js";

import { createInterface, type Interface } from "readline";
import { command_exit } from "./command_exit.js";
import { command_help } from "./command_help.js";
import { command_map, command_mapb } from "./command_map.js";
import { command_explore } from "./command_explore.js";
import { command_catch } from "./command_catch.js";
import { command_inspect } from "./command_inspect.js";
import {command_pokedex} from "./command_pokedex.js";


export function initState(): State {
    const readInput = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    const pokeAPI = new PokeAPI(60*1000);

    const pokemonCaught: Record<string, Pokemon> = {};

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
        map: {
            name: "map",
            description: "Displays the list of location areas",
            callback: command_map
        },
        mapb: {
            name: "mapb",
            description: "Goes back a page when listing location areas",
            callback: command_mapb
        },
        explore: {
            name: "explore",
            description: "Explore the location of an area",
            callback: command_explore
        },
        catch: {
            name: "catch",
            description: "Attempt to catch a pokemon",
            callback: command_catch
        },
        inspect: {
            name: "inspect",
            description: "Shows information about a caught pokemon",
            callback: command_inspect
        },
        pokedex: {
            name: "pokedex",
            description: "List all caught pokemon",
            callback: command_pokedex
        }
    };

    return {
        readInput,
        commands,
        pokeAPI,
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokemonCaught,
    };

}

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State, ...arg1: string[]) => Promise<void>,
};

export type State = {
    readInput: Interface,
    commands: Record<string, CLICommand>,
    pokeAPI: PokeAPI,
    nextLocationsURL: string | null,
    prevLocationsURL: string | null,
    pokemonCaught: Record<string, Pokemon>,
}
