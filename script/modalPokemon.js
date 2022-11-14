import { getPokemon, getTextPokemon } from "./requestAPI.js";

const body = document.querySelector('body');

export async function openModal(pokemon){
  const pokemonDetails = await getPokemon (pokemon)
  console.log(pokemonDetails)
  const sectionModal = document.createElement('section');
  const divModal = document.createElement('div');
  const imgPokeball = document.createElement('img');

  const headerModal = document.createElement('header');
  const headerImg = document.createElement('img');
  const namePokemon = document.createElement('p');
  const idPokemon = document.createElement('span');

  const divDetails = document.createElement('div');
  const pokemonImg = document.createElement('img');
  const divType = document.createElement('div');
  const phAbout = document.createElement('p');
  const divAbout = document.createElement('div');
  const divWeight =  document.createElement('div');
  const divWeight2 =  document.createElement('div');
  const imgWeight = document.createElement('img');
  const spanWeight = document.createElement('span');
  const spanWeight2 = document.createElement('span');
  const divHeight =  document.createElement('div');
  const divHeight2 =  document.createElement('div');
  const imgHeight = document.createElement('img');
  const spanHeight = document.createElement('span');
  const spanHeight2 = document.createElement('span');
  const divMoves =  document.createElement('div');
  const divMoves2 =  document.createElement('div');
  const spanMoves = document.createElement('span');
  const divDivisao = document.createElement('div');
  const divDivisao2 = document.createElement('div');
  const pCuriosity = document.createElement('p');
  const phStats = document.createElement('p');
  const divStats = document.createElement('div');

  sectionModal.className = 'modal-container';
  sectionModal.addEventListener('click', () => {
    sectionModal.remove()
  })

  imgPokeball.src = './img/Pokeball-transparent.svg';
  imgPokeball.className = 'pokeball-transparent';

  divDetails.className = 'div-details';
  divType.className = 'div-type';

  pokemonDetails.types.forEach(type => {
    const spanType = document.createElement('span');
    spanType.innerText = type.type.name
    spanType.classList = `type type-${type.type.name}-background text-bold text-bold-10`
    divType.insertAdjacentElement('beforeend', spanType)
  });

  pokemonImg.className = 'pokemon-img';
  pokemonImg.src = `${pokemonDetails.sprites.other.dream_world.front_default}`

  divModal.classList = `modal type-${pokemonDetails.types[0].type.name}-background`;

  headerModal.classList = 'header-modal';

  headerImg.src = './img/arrow-left.svg';
  headerImg.addEventListener('click', () => {
    sectionModal.remove()
  })

  namePokemon.innerText = pokemon;
  namePokemon.classList = 'text-bold-24 text-bold name-pokemon'

  idPokemon.classList = 'text-bold-12 text-bold id-pokemon'

  if(pokemonDetails.id < 10){
    idPokemon.innerText = `#00${pokemonDetails.id}`
  } else if(pokemonDetails.id >= 10 && pokemonDetails.id < 100){
    idPokemon.innerText = `#0${pokemonDetails.id}`
  } else {
    idPokemon.innerText = `#${pokemonDetails.id}`
  }

  phAbout.innerText = 'About';
  phAbout.style.color = `var(--${pokemonDetails.types[0].type.name})`;
  phAbout.classList = "text-bold text-bold-14";

  divAbout.classList = 'div-about';
  divWeight.className = 'div-weight';
  divWeight2.className = 'div-weight2';
  imgWeight.src = './img/Weight.svg';
  spanWeight.innerText = `${(pokemonDetails.weight * 0.453592).toFixed(1)} kg`;
  spanWeight.classList = 'text-regular text-regular-10';
  spanWeight2.innerText = 'Weight';
  spanWeight2.classList = 'text-regular text-regular-10 desc';

  divHeight.className = 'div-height';
  divHeight2.className = 'div-height2';
  imgHeight.src = './img/regua.svg'
  spanHeight.innerText = `${(pokemonDetails.height * 0.3048).toFixed(2)} m`;
  spanHeight.classList = 'text-regular text-regular-10';
  spanHeight2.innerText = 'Height';
  spanHeight2.classList = 'text-regular text-regular-10 desc';

  divDivisao.className = 'divisao'
  divDivisao2.className = 'divisao'

  divMoves.className = 'div-moves'
  pokemonDetails.abilities.forEach(move => {
    const spanAbility = document.createElement('p');
    spanAbility.innerText = move.ability.name
    spanAbility.classList = 'text-regular text-regular-10'
    spanAbility.style.textTransform = 'capitalize'

    divMoves2.insertAdjacentElement('beforeend', spanAbility)
  })
  spanMoves.innerText = 'Moves';
  spanMoves.classList = 'text-regular text-regular-10 descr';
  const text = await getTextPokemon(pokemon);
  pCuriosity.innerText = text.replace(/\n/gi, ' ');
  pCuriosity.classList = 'text-regular text-regular-10 p-curiosity';

  phStats.innerText = 'Base Stats'
  phStats.style.color = `var(--${pokemonDetails.types[0].type.name})`;
  phStats.classList = "text-bold text-bold-14";

  divStats.classList = 'stats'
  pokemonDetails.stats.forEach(stat => {
   const pStats = document.createElement('p');
   const spanType = document.createElement('span');
   const spanDiv = document.createElement('span');
   const spanValue = document.createElement('span');
   const range = document.createElement('progress');
   range.max = 250;
   range.min = 0;
   range.classList = `range progress-${pokemonDetails.types[0].type.name}`
   pStats.classList = 'text-regular text-bold-14 p-Stats'
   spanType.classList = 'span-Type text-bold'
   spanDiv.className = 'span-divisao'
   range.value = stat.base_stat;
   spanType.style.color = `var(--${pokemonDetails.types[0].type.name})`;

   if (stat.base_stat > 99){ 
    spanValue.innerText = `${stat.base_stat}`
  } else {
    spanValue.innerText = `0${stat.base_stat}`
  }
    if(stat.stat.name == 'hp'){

      spanType.innerText = 'HP'
      pStats.append(spanType, spanDiv, spanValue, range)
      divStats.insertAdjacentElement('beforeend', pStats)

    } else if(stat.stat.name == 'attack'){

      spanType.innerText = 'ATK'
      pStats.append(spanType, spanDiv, spanValue, range)
      divStats.insertAdjacentElement('beforeend', pStats)

    } else if(stat.stat.name == 'defense'){
      
      spanType.innerText = 'DEF'
      pStats.append(spanType, spanDiv, spanValue, range)
      divStats.insertAdjacentElement('beforeend', pStats)

    } else if(stat.stat.name == 'special-attack'){
      
      spanType.innerText = 'SATK'
      pStats.append(spanType, spanDiv, spanValue, range)
      divStats.insertAdjacentElement('beforeend', pStats)

    } else if(stat.stat.name == 'special-defense'){

      spanType.innerText = 'SDEF'

      pStats.append(spanType, spanDiv, spanValue, range)
      divStats.insertAdjacentElement('beforeend', pStats)

    } else if(stat.stat.name == 'speed'){
      
      spanType.innerText = 'SPD'
      pStats.append(spanType, spanDiv, spanValue, range)
      divStats.insertAdjacentElement('beforeend', pStats)

    }   
  })

  headerModal.append(headerImg, namePokemon, idPokemon);
  divWeight2.append(imgWeight, spanWeight)
  divWeight.append(divWeight2, spanWeight2)
  divHeight2.append(imgHeight, spanHeight)
  divHeight.append(divHeight2, spanHeight2)
  divMoves.append(divMoves2, spanMoves)
  divAbout.append(divWeight, divDivisao,  divHeight, divDivisao2 ,divMoves);
  divDetails.append(pokemonImg, divType, phAbout, divAbout, pCuriosity, phStats, divStats);
  divModal.append(headerModal, imgPokeball, divDetails);
  sectionModal.append(divModal);
  body.append(sectionModal);
}

