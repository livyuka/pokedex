const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.name = pokeDetail.name;

    pokemon.numberId = getPokemonId(pokeDetail.id);

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    pokemon.image = pokeDetail['sprites']['other']['official-artwork']['front_default'];

    return pokemon
}

function getPokemonId(id){
    let pokemonId;
    if (id < 10){
        pokemonId = "00" + id;
    }else if (id < 100){
        pokemonId = "0" + id;
    }else{
        pokemonId = id;
    }
    return pokemonId
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((requestDetail) => Promise.all(requestDetail))
    
}