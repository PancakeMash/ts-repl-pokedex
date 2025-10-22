export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        let response = await fetch(pageURL ?? `${PokeAPI.baseURL}/location-area`);
        if (!response.ok) {
            console.log("Status: " + response.status);
            throw new Error("Failed to fetch locations");
        }
        return await response.json();
    }
    async fetchLocation(locationName) {
        throw "Not implemented";
    }
}
