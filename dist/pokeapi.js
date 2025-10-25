import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    #cache;
    constructor(interval) {
        this.#cache = new Cache(interval);
    }
    async fetchLocations(pageURL) {
        const key = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        const cacheHit = this.#cache.get(key);
        if (cacheHit !== undefined) {
            return cacheHit;
        }
        const response = await fetch(key);
        if (!response.ok) {
            console.log("Status: " + response.status);
            throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        this.#cache.add(key, data);
        return data;
    }
    async fetchLocation(locationName) {
        const key = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cacheHit = this.#cache.get(key);
        if (cacheHit !== undefined) {
            return cacheHit;
        }
        const response = await fetch(key);
        if (!response.ok) {
            console.log("Status: " + response.status);
            throw new Error("Failed to fetch location");
        }
        const data = await response.json();
        this.#cache.add(key, data);
        return data;
    }
    async fetchPokemon(pokemonName) {
        const fixedName = pokemonName.toLowerCase().trim();
        const key = `${PokeAPI.baseURL}/pokemon/${fixedName}`;
        const cacheHit = this.#cache.get(key);
        if (cacheHit !== undefined) {
            return cacheHit;
        }
        const response = await fetch(key);
        if (!response.ok) {
            console.log("Status: " + response.status);
            throw new Error("Failed to fetch pokemon");
        }
        const data = await response.json();
        this.#cache.add(key, data);
        return data;
    }
}
