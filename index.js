const pokeURL = 'https://pokeapi.co/api/v2/pokemon?limit=151'
let container = document.querySelector('.flexbox-container')
const column1 = document.querySelector('.column-one')
const column2 = document.querySelector('.column-two')
const column3 = document.querySelector('.column-three')
let input = document.querySelector('#pokemonName')

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
    let imageMain
    let imageShiny

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
     .then(response => response.json())
     .then((data) => {
        document.querySelectorAll('p').forEach(node => node.remove())
        document.querySelector('.flexbox-item-1').style.display = "flex"
        document.querySelector('.flexbox-container2').style.display = "contents"
        document.querySelector('.welcome-card').style.display = "none"

        const column2_data = ['id', 'height', 'weight', 'base_experience', 'moves']

        Object.entries(data).forEach(pokeKeyValue => { 
        // console.log(pokeKeyValue) // pokemon key and value pairs in an array['abilities', Array(1)]
        const p = document.createElement('p')

        if(pokeKeyValue[0] === "name"){  // check to apend to column one
            h2 = document.getElementById('pokeName')
            h2.innerText = capFirstLetter(pokeKeyValue[1])
        
        }else if (pokeKeyValue[0] === "sprites") { // handles images
            imageMain = pokeKeyValue[1].other.home.front_default
            imageShiny = pokeKeyValue[1].other.home.front_shiny

            document.getElementById('pokeImage').src = imageMain

        } else if(column2_data.includes(pokeKeyValue[0])) {
            p.innerText = (pokeKeyValue[0] === "moves" ? (`Best Move: ${capFirstLetter(pokeKeyValue[1][0].move.name)}`) : (`${capFirstLetter(pokeKeyValue[0])}: ${pokeKeyValue[1]}`))
            column2.append(p)

        } else if(pokeKeyValue[0] === "stats") {

            pokeKeyValue[1].forEach((obj) => {
                const p = document.createElement('p')
                p.innerText = `${capFirstLetter(obj.stat.name)}: ${obj.base_stat}`
                column3.append(p)
              })
        } 
      })

    // event listener mouse over/out on image   
    container.addEventListener('mouseover', () => {
        document.getElementById('pokeImage').src=`${imageShiny}`
    });
    container.addEventListener('mouseout', () => {
        document.getElementById('pokeImage').src=`${imageMain}`
    });

    })
     .catch((error) => {
        console.log("Pokemon Not Found", error)
    })
}