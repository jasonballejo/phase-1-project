const pokeURL = `https://pokeapi.co/api/v2/pokemon`
let container = document.querySelector('.flexbox-container')
let form = document.getElementById('searchbar')
let button = document.querySelector('button')

// Render Card to DOM
function renderPokemon(pokemon) {
    // console.log('LIST POKEMON:', pokemon)
    // create elements
    let divCard = document.createElement('div')
    let divColumnOne = document.createElement('div')
    let divColumnTwo = document.createElement('div')
    let divColumnThree = document.createElement('div')
    let h3 = document.createElement('h3')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let pNumber = document.createElement('p')
    let pHeight = document.createElement('p')
    let pWeight = document.createElement('p')
    let pTypes = document.createElement('p')
    let pBase = document.createElement('p')
    let pMoves = document.createElement('p')
    let pHP = document.createElement('p')
    let pAttack = document.createElement('p')
    let pDefense = document.createElement('p')
    let pSA = document.createElement('p')
    let pSD = document.createElement('p')
    let pSpeed = document.createElement('p')
    let pAbility = document.createElement('p')

    // add Content
    divCard.className = 'flexbox-item flexbox-item-1'
    divColumnOne.className = 'column-one'
    divColumnTwo.className = 'column-two'
    divColumnThree.className = 'column-three'

    // column-one
    h2.textContent = pokemon.name
    img.className = 'pokemon_img' // come back to this
    
    // column-two
    h3.textContent = 'Pokemon Stats'
    pNumber.textContent = `Number: ${pokemon.id}`
    pHeight.textContent = `Height: ${pokemon.height}`
    pWeight.textContent = `Weight: ${pokemon.weight}lbs`
    pTypes.textContent = `Types: ${pokemon.types[0].type.name}`
        // & ${pokemon.types[1].type.name}`
    pBase.textContent = `Base Stat: ${pokemon.base_experience}`
    pMoves.textContent = `Moves: ${pokemon.moves[0].move.name}` 
        // & ${pokemon.moves[1].move.name}`

    // column-three
    pHP.textContent = `HP: ${pokemon.stats[0].base_stat}`
    pAttack.textContent = `Attack: ${pokemon.stats[1].base_stat}`
    pDefense.textContent = `Defense: ${pokemon.stats[2].base_stat}`
    pSA.textContent = `Special-Attack: ${pokemon.stats[3].base_stat}`
    pSD.textContent = `Special-Defense: ${pokemon.stats[4].base_stat}`
    pSpeed.textContent = `Speed: ${pokemon.stats[5].base_stat}`
    pAbility.textContent = `Ability: ${pokemon.abilities[0].ability.name}`
        // & ${pokemon.abilities[1].ability.name}`
    
    //add content to the DOM
    divColumnOne.append(h2)
    divColumnTwo.append(h3, pNumber, pHeight, pWeight, pTypes, pBase, pMoves)
    divColumnThree.append(pHP, pAttack, pDefense, pSA, pSD, pSpeed, pAbility)
    divCard.append(divColumnOne, divColumnTwo, divColumnThree)
    container.append(divCard)
}

// fetch: GET
function getPokeAPI(e) {
    e.preventDefault()
    fetch(pokeURL)
    .then(res => res.json())
    .then(data => data.results.forEach(pokemon => {  
         fetch(pokemon.url)  
         .then(res => res.json())  
         .then(pokeInfo => renderPokemon(pokeInfo))  
    }))
    .catch(error => console.error('Error:', error))
}

// Event Listeners

// submit form
// form.addEventListener('submit', (e) => getPokeAPI(e))

// button 
button.addEventListener('click', (e) => postPokemon(e))

// // fetch: POST
function postPokemon(e) {
    e.preventDefault()
    fetch(pokeURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(e)
    })
    .then(data => data.results.forEach(pokemon => {  
        fetch(pokemon.url)  
        .then(res => res.json())  
        .then(pokeInfo => renderPokemon(pokeInfo))
    })
    .catch(error => console.error('Error:', error))

  )}