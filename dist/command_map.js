export async function command_map(state) {
    let response = await state.pokeAPI.fetchLocations(state.nextLocationsURL || undefined);
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;
    for (const location of response.results) {
        console.log(location.name);
    }
}
export async function command_mapb(state) {
    if (state.prevLocationsURL === null) {
        console.log("you're on the first page");
        return;
    }
    let response = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;
    for (const location of response.results) {
        console.log(location.name);
    }
}
