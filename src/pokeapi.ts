export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        let response = await fetch(pageURL ?? `${PokeAPI.baseURL}/location-area`);
        if (!response.ok) {
            console.log("Status: " + response.status);
            throw new Error("Failed to fetch locations");
        }
        return await response.json();
    }

    async fetchLocation(locationName: string): Promise<Location> {
        throw "Not implemented";
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