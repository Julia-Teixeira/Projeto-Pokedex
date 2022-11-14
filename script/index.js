import { getPokemons, getPokemon, getTextPokemon} from '../script/requestAPI.js';
import { openModal } from './modalPokemon.js';

let lista = JSON.parse(localStorage.getItem('Lista'))
const btnCarregar = document.querySelector('.btnCarregar');

const ulListaPokemon = document.querySelector('.lista-pokemons');

 function montarCards(id, nome, types, img) {
  let idTratado
  if(id < 10){
    idTratado = `#00${id}`
  } else if(id >= 10 && id < 100){
    idTratado = `#0${id}`
  } else {
    idTratado = `#${id}`
  }
 
  ulListaPokemon.insertAdjacentHTML('beforeend',
    `
    <li class="pokemon type-${types[0].type.name}-border-color" id="${nome}">
      <div class="div-up">
        <p class="text-regular text-regular-8">${idTratado}</p>
        <img src="${img}" alt="${nome}">
        <div class="type-${types[0].type.name}-background div-down">
        <p class="text-regular text-regular-10">${nome}</p>
      </div>
      </div>

    </li>
  `
  )

}

function searchPokemon(){

  const inpSearch = document.querySelector('.search')
  inpSearch.addEventListener('keyup', async () => {
    ulListaPokemon.innerHTML= ""
   
    lista.forEach((e) => {
      if(e.nome.includes((inpSearch.value).toLowerCase())){
        montarCards(e.id, e.nome, e.types, e.img )
      } else if(inpSearch.value.length == 0){
        lista.forEach((e) => {
          montarCards(e.id, e.nome, e.types, e.img )
        })

      }
    }) 
    
  })
}

function filterPokemon(){
  const filter = document.querySelector('.filter')
  filter.addEventListener('click', () =>{
    let lista = JSON.parse(localStorage.getItem('Lista'))
    ulListaPokemon.innerHTML= ""
    filter.classList.toggle('filterName')
  
    if(filter.classList.contains('filterName')){
      let namePokemon = []
      lista.forEach(({nome}) => {
        namePokemon.push(nome)
      })
      let namePokemonOrdenada = namePokemon.sort()
  
      namePokemonOrdenada.forEach(e => {
        lista.forEach((pokemon) => {
          if (e == pokemon.nome) { 
            montarCards(pokemon.id, pokemon.nome, pokemon.types, pokemon.img )
          }
        })
      })
    } else if(filter.classList.contains('filterNumber')){
      let idPokemon = []
      lista.forEach(({id}) => {
        idPokemon.push(id)
      })
      
      let idPokemonOrdenada = idPokemon.sort((a,b) => {
        return a - b
      })

      idPokemonOrdenada.forEach(e => {
        lista.forEach((pokemon) => {
          if (e == pokemon.id) { 
            montarCards(pokemon.id, pokemon.nome, pokemon.types, pokemon.img )
          }
        })
      })
    }
  
  })
}

btnCarregar.addEventListener('click', () => {
  
      let currentOffset = JSON.parse(localStorage.getItem('currentOffset'))
      getPokemons(currentOffset + 21)
})

function cardPokemonDetails(){
  ulListaPokemon.addEventListener('click', async (event) => {
    
    if(event.path[2].classList.contains('pokemon')){
      openModal(event.path[2].id)
      const text = await getTextPokemon(event.path[2].id)  
    }
    
  })
}

filterPokemon()
searchPokemon()
cardPokemonDetails()
export {
  montarCards
}