function pokeAPI(){
    return fetch('https://pokeapi.co/api/v2/pokemon')
    .then(res => res.json())
    .then(rend => rend)
}