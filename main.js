document.addEventListener('DOMContentLoaded', () => {
    let result = document.getElementById('result');
    let modal = document.getElementById('modal');
    let modalContent = document.querySelector('.modal-content');
    let modalCloseBtn = document.getElementById('modal-close-btn');
  
    let getPokemonData = async (pokemonURL) => {
      let response = await fetch(pokemonURL);
      let data = await response.json();
      return data;
    }
  
    let getPokemon = async (URL) => {
      try {
        let response = await fetch(URL);
        let data = await response.json();
        let pokemonList = data.results;
  
        let gridContainer = document.createElement('div');
        gridContainer.classList.add('grid', 'grid-cols-3', 'gap-8', 'mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8', 'mt-8' );
  
        for (let i = 0; i < pokemonList.length; i++) {
          let pokemonURL = pokemonList[i].url;
          let pokemonData = await getPokemonData(pokemonURL);
  
          let tarjeta = document.createElement('div');
          tarjeta.classList.add('max-w-sm', 'p-6', 'dark:bg-gray-800', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700');
  
          let enlace = document.createElement('a');
          enlace.href = '#';
  
          let titulo = document.createElement('h5');
          titulo.classList.add('mb-2', 'text-2xl', 'font-bold', 'tracking-tight', 'text-gray-900', 'dark:text-white');
          titulo.textContent = pokemonData.name;
  
          let parrafo = document.createElement('p');
          parrafo.classList.add('mb-1', 'font-normal', 'text-gray-700', 'dark:text-gray-400');
          parrafo.textContent = `Type: ${pokemonData.types.map(type => type.type.name).join(', ')}`;
  
          let tipoContainer = document.createElement('div');
          tipoContainer.classList.add('flex', 'flex-wrap', 'mt-1');
  
          pokemonData.types.forEach(type => {
            let tipo = document.createElement('span');
            tipo.classList.add('px-2', 'py-1', 'text-xs', 'font-medium', 'text-white', 'bg-blue-700', 'rounded-full', 'mr-1', 'mb-1');
            tipo.textContent = type.type.name;
            tipoContainer.appendChild(tipo);
          });
  
          let imagen = document.createElement('img');
          imagen.src = pokemonData.sprites.front_default;
          imagen.alt = '';
  
          let leerMas = document.createElement('a');
          leerMas.href = '#';
          leerMas.classList.add('inline-flex', 'items-center', 'px-3', 'py-2', 'text-sm', 'font-medium', 'text-center', 'text-white', 'bg-blue-700', 'rounded-lg', 'hover:bg-blue-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-blue-300', 'dark:bg-blue-600', 'dark:hover:bg-blue-700', 'dark:focus:ring-blue-800');
          leerMas.textContent = 'Read more';
  
          let icono = document.createElement('svg');
          icono.classList.add('w-3.5', 'h-3.5', 'ml-2');
          icono.setAttribute('aria-hidden', 'true');
          icono.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          icono.setAttribute('fill', 'none');
          icono.setAttribute('viewBox', '0 0 14 10');
  
          let path = document.createElement('path');
          path.setAttribute('stroke', 'currentColor');
          path.setAttribute('stroke-linecap', 'round');
          path.setAttribute('stroke-linejoin', 'round');
          path.setAttribute('stroke-width', '2');
          path.setAttribute('d', 'M1 5h12m0 0L9 1m4 4L9 9');
  
          icono.appendChild(path);
          leerMas.appendChild(icono);
          enlace.appendChild(titulo);
          tarjeta.appendChild(enlace);
          //tarjeta.appendChild(parrafo);
          tarjeta.appendChild(tipoContainer);
          tarjeta.appendChild(imagen);
          tarjeta.appendChild(leerMas);
          gridContainer.appendChild(tarjeta);
  
          tarjeta.addEventListener('click', async (e) => {
            e.preventDefault();
            modalContent.innerHTML = '';
  
            let modalTitle = document.createElement('h2');
            modalTitle.classList.add('text-3xl', 'font-bold', 'mb-4');
            modalTitle.textContent = pokemonData.name;
  
            let modalImage = document.createElement('img');
            modalImage.classList.add('mb-4');
            modalImage.src = pokemonData.sprites.front_default;
            modalImage.alt = '';
  
            let modalDescription = document.createElement('p');
            modalDescription.classList.add('text-gray-700', 'dark:text-gray-400', 'mb-4');
            modalDescription.textContent = `Description: ${await getPokemonDescription(pokemonData.species.url)}`;
  
            let modalAbilities = document.createElement('p');
            modalAbilities.classList.add('text-gray-700', 'dark:text-gray-400', 'mb-4');
            modalAbilities.textContent = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}`;
  
            let modalMoves = document.createElement('p');
            modalMoves.classList.add('text-gray-700', 'dark:text-gray-400', 'mb-4');
            modalMoves.textContent = `Moves: ${pokemonData.moves.map(move => move.move.name).join(', ')}`;
  
            let closeButton = document.createElement('button');
            closeButton.classList.add('modal-close-btn', 'ml-auto', 'flex', 'items-center', 'p-2', 'text-gray-600', 'dark:text-gray-300', 'hover:text-gray-900', 'dark:hover:text-white');
            closeButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            `;
  
            closeButton.addEventListener('click', () => {
              modal.classList.add('hidden');
            });
  
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(modalImage);
            modalContent.appendChild(modalDescription);
            modalContent.appendChild(modalAbilities);
            //modalContent.appendChild(modalMoves);
            modalContent.appendChild(closeButton);
  
            modal.classList.remove('hidden');
          });
        }
  
        result.appendChild(gridContainer);
  
        let nextURL = data.next;
        if (nextURL) {
          getPokemon(nextURL);
        }
      } catch (error) {
        result.innerHTML += `<h3 class="text-red-500 font-bold text-center mt-4">ERROR Occurred</h3>`;
      }
    }
  
    let getPokemonDescription = async (speciesURL) => {
      try {
        let response = await fetch(speciesURL);
        let data = await response.json();
        let description = data.flavor_text_entries.find(entry => entry.language.name === 'en');
        return description.flavor_text;
      } catch (error) {
        return 'No description available';
      }
    }
  
    getPokemon('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=21');
  
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  });
  