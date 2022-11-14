import { montarCards } from "../script/index.js";
const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let listPokemon = []
let offset = 0


const getPokemons = async (currentOffset) => {
  
  const response = await fetch(`${baseURL}?offset=${currentOffset}&limit=21`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  localStorage.setItem(`currentOffset`, currentOffset)
  localStorage.setItem('Lista', '')
  const result = await response.json();
  const pokemons = [...result.results]
  pokemons.forEach( async (e) => {
    getIdPokemon(e.name) 
  })
}
getPokemons(offset)
const getIdPokemon =  (nome) => {
    try {
      fetch(`${baseURL}${nome}`).then(request => { return request.json() }).then(response => {

        const poke = {nome: response.name, id: response.id, types: response.types, weight: response.weight, height: response.height, abilities: response.abilities, stats: response.stats, img: response.sprites.other.dream_world.front_default}

        montarCards(response.id, response.name, response.types, response.sprites.other.dream_world.front_default )

        listPokemon.push(poke)

        localStorage.setItem('Lista', JSON.stringify(listPokemon))
        return response
      })

    } catch (error) {
      return error
    }
}
const getPokemon = async (name) => {
  
  const request = await fetch(`${baseURL}${name}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await request.json()
  return response
}

const getTextPokemon = async (name) => {

  const request = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await request.json()
  
  return response.flavor_text_entries[9].flavor_text
  
}

export {getPokemons, listPokemon, getIdPokemon, offset, getPokemon, getTextPokemon}