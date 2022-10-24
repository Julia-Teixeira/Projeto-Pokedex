import { montarCards } from "../script/index.js";
const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let listPokemon = [];


const getPokemons = async () => {
  const response = await fetch(baseURL + '?limit=56', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  localStorage.setItem('Lista', '')
  const result = await response.json();
  const pokemons = [...result.results]
  pokemons.forEach( async (e) => {
    getIdPokemon(e.name) 
  })
}

const getIdPokemon =  (nome) => {
    try {
      fetch(`${baseURL}${nome}`).then(request => { return request.json() }).then(response => {

        const poke = {nome: response.name, id: response.id, types: response.types, weight: response.weight, height: response.height, abilities: response.abilities, stats: response.stats, img: response.sprites.other.dream_world.front_default}

        montarCards(response.id, response.name, response.types, response.sprites.other.dream_world.front_default )

        listPokemon.push(poke)

        localStorage.setItem('Lista', JSON.stringify(listPokemon))
      })
     
    } catch (error) {
      return error
    }
}

getPokemons()

export {getPokemons, listPokemon, getIdPokemon}