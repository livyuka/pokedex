const olPokemon = document.getElementById("pokemonList");

const loadMoreButton = document.getElementById("loadMoreButton")

const maxRecords = 151;

const limit = 5;

let offset = 0;

function convertPokemonToLi(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.numberId}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
            <img src=${pokemon.image} alt="${pokemon.name}">
        </div>
    </li>`
}

function loadPokemonList(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        olPokemon.innerHTML += pokemonList.map(convertPokemonToLi).join("")
    })
}

loadPokemonList(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecord = offset + limit;

    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset 
        loadPokemonList(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return
    } else {
        loadPokemonList(offset, limit)
    }

})


