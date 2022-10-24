import { getPokemons, getIdPokemon} from '../script/requestAPI.js';
let lista = JSON.parse(localStorage.getItem('Lista'))

const ulListaPokemon = document.querySelector('.lista-pokemons');

function montarCards(id, nome, types, img) {
 
  ulListaPokemon.insertAdjacentHTML('beforeend',
    `
    <li class="pokemon " id="${nome}">
      <div class="type-${types[0].type.name}-border-color div-up">
        <p class="text-regular text-regular-8">#${id}</p>
        <img src="${img}" alt="${nome}">
      </div>
      <div class="type-${types[0].type.name}-background div-down">
        <p class="text-regular text-regular-10">${nome}</p>
      </div>
    </li>
  `
  )

}

function searchPokemon(){

  const inpSearch = document.querySelector('.search')
  inpSearch.addEventListener('keyup', () => {
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
    } else {
      lista.forEach((e) => {
        montarCards(e.id, e.nome, e.types, e.img )
      })
    }
  
  })
}



filterPokemon()
searchPokemon()

export {
  montarCards
}
  // https://cdn.traction.one/pokedex/pokemon/