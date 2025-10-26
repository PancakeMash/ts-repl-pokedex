import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    #cache: Cache;

    constructor(interval: number) {
        this.#cache = new Cache(interval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const key = pageURL ?? `${PokeAPI.baseURL}/location-area`;

        const cacheHit = this.#cache.get<ShallowLocations>(key);
        if (cacheHit !== undefined) {
            return cacheHit;
        }

        const response = await fetch(key);
        if (!response.ok) {
            console.log("Status: " + response.status);
            throw new Error("Failed to fetch locations");
        }

        const data: ShallowLocations = await response.json();
        this.#cache.add(key, data);

        return data;
    }

    async fetchLocation(locationName: string): Promise<LocationArea> {
        const key = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cacheHit = this.#cache.get<LocationArea>(key);
        if (cacheHit !== undefined) {
            return cacheHit;
        }

        const response = await fetch(key);
        if (!response.ok) {
            console.log("Status: " + response.status);
            throw new Error("Failed to fetch location");
        }

        const data: LocationArea = await response.json();
        this.#cache.add(key, data);

        return data;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const fixedName = pokemonName.toLowerCase().trim();
        const key = `${PokeAPI.baseURL}/pokemon/${fixedName}`;

        const cacheHit = this.#cache.get<Pokemon>(key);
        if (cacheHit !== undefined) {
            return cacheHit;
        }

        const response = await fetch(key);
        if (!response.ok) {
            console.log("Status: " + response.status);
            throw new Error("Failed to fetch pokemon");
        }

        const data: Pokemon = await response.json();
        this.#cache.add(key, data);

        return data;
    }

}

export type ShallowLocations = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Location[],
};

export type Location = {
    name: string,
    url: string,
};

export type LocationArea = {
    name: string;
    pokemon_encounters: PokemonEncounter[];
};

export type PokemonEncounter = {
    pokemon: {
        name: string;
        url: string;
    };
};

export type Pokemon = {
    name: string;
    base_experience: number;
    weight: number;
    height: number;
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
};