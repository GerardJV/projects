//Selección de los elementos para la pokédex.

const $pokeCard = document.querySelector("[data-poke-card]"),
    $pokeName = document.querySelector("[data-poke-name]"),
    $pokeImg = document.querySelector("[data-poke-img]"),
    $pokeImgContainer = document.querySelector("[data-poke-img-container]"),
    $pokeId = document.querySelector("[data-poke-id]"),
    $pokeTypes = document.querySelector("[data-poke-types]"),
    $pokeStats = document.querySelector("[data-poke-stats]");


// Colores que llevarán cada tipo de pokémon
 const typeColors = {
        electric: '#FFEA70',
        normal: '#B09398',
        fire: '#FF675C',
        water: '#0596C7',
        ice: '#AFEAFD',
        rock: '#999799',
        flying: '#7AE7C7',
        grass: '#4A9681',
        psychic: '#FFC6D9',
        ghost: '#561D25',
        bug: '#A2FAA3',
        poison: '#795663',
        ground: '#D2B074',
        dragon: '#DA627D',
        steel: '#1D8A99',
        fighting: '#2F2F2F',
        default: '#2A1A1F',
};

// Búsqueda del pokémon por nombre o número 
const searchPokemon = event => {
    event.preventDefault(); // Para cancelar el submit del form.
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

// Datos que se van a traer al realizar la búsqueda.
const renderPokemonData = data => {
    const sprite = data.sprites.other.home.front_default;
    const { stats, types } = data;
    console.log(data)

    $pokeName.textContent = data.name;
    $pokeImg.setAttribute("src", sprite);
    $pokeId.textContent = `N.° ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

// Color de fondo cuando se muestre el pokémon 
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    $pokeImg.style.background = colorOne;
}

// Tipo del pokémon
const renderPokemonTypes = types => {
    $pokeTypes.innerHTML = "";
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        $pokeTypes.appendChild(typeTextElement);
    });
}

// Stats del pokémon.
const renderPokemonStats = stats => {
    $pokeStats.innerHTML = "";
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        $pokeStats.appendChild(statElement);
    });
}

// Cuando no se encuentre el nombre o número del pokémon solicitado.
const renderNotFound = () => {
    $pokeName.textContent = "Pokémon no encontrado :(";
    $pokeImg.setAttribute("src", "pokeshadow.jpg");
    $pokeTypes.innerHTML = "";
    $pokeStats.innerHTML = "";
    $pokeId.textContent = "";
}