const pokeURL = 'https://pokeapi.co/api/v2/pokemon?limit=151'
let container = document.querySelector('.flexbox-container')
let input = document.querySelector('#pokemonName')

function fetching () {
    fetch(pokeURL)
    .then(res => res.json())
    .then((data) => data.results.forEach(pokemon => {
        fetch(pokemon.url)
        .then(res => res.json())
        .then((data) => console.log(data))
    }))
}

// Event Listeners
// click search button for result
document.querySelector('#search').addEventListener('click', renderPokemon)

// enter key to search bar
input.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        return renderPokemon(e.target.value)
    }
})

// Update word cases
function lowerCaseName(string) {
    return string.toLowerCase()
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// fetch: GET & create card
function renderPokemon(e) {
    const name = input.value
    const pokemonName = lowerCaseName(name)

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
     .then(response => response.json())
     .then((data) => {
        document.querySelector('.flexbox-container').innerHTML = ` 
    
    <div class="flexbox-item flexbox-item-1">
    <div class="column-one">
        <h2>${capFirstLetter(data.name)}</h2> 
        <img id="pokeImage" src="${data.sprites.other["home"].front_default}">
    </div>
    
    <div class="column-two">
        <h3>Pokemon Stats</h3>
        <p>Number: ${data.id}</p>
        <p>Height: ${data.height} feet</p>
        <p>Weight: ${data.weight} lbs</p>
        <p>Type: ${capFirstLetter(data.types[0].type.name)}</p>
        <p>Base Stat: ${data.base_experience}</p>
        <p>Best Move: ${capFirstLetter(data.moves[1].move.name)}</p>
    </div>

    <div class="column-three">
        <p>HP: ${data.stats[0].base_stat}</p>                 
        <p>Attack: ${data.stats[1].base_stat}</p>
        <p>Defense: ${data.stats[2].base_stat}</p>
        <p>Special-Attack: ${data.stats[3].base_stat}</p>
        <p>Special-Defense: ${data.stats[4].base_stat}</p>
        <p>Speed: ${data.stats[5].base_stat}</p>
        <p>Ability: ${capFirstLetter(data.abilities[0].ability.name)}</p>
    </div>
    `
    document.querySelector('.flexbox-container2').innerHTML = `
        <div class="Bottom">
        </div>
        <h4>Hover over the image to change into it's shiny form ✨</h4>
        </div> 
    `
    // event listener mouse over/out on image   
    container.addEventListener('mouseover', () => {
        document.getElementById('pokeImage').src=`${data.sprites.other["home"].front_shiny}`
    });
    container.addEventListener('mouseout', () => {
        document.getElementById('pokeImage').src=`${data.sprites.other["home"].front_default}`
    });

    })
     .catch((error) => {
        console.log("Pokemon Not Found", error)
    })
}