const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  const ids = document.getElementById('pokemon-ids').value;
  const idArray = ids.split(',');

  // Basic validation (can be more robust)
  if (idArray.length !== 6) {
    alert('Please enter exactly 6 IDs.');
    event.preventDefault();
  }
});

// Get the Pokémon IDs from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const pokemonIds = urlParams.get('pokemon-ids').split(',');

// Fetch and display information for each Pokémon
pokemonIds.forEach(id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name} - ${data.sprites.front_default}`;
      document.getElementById('pokemon-list').appendChild(listItem);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      const listItem = document.createElement('li');
      listItem.textContent = `Error fetching data for Pokémon ID ${id}`;
      document.getElementById('pokemon-list').appendChild(listItem);
    });
});
