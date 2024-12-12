// Get the Pokémon IDs from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
let pokemonIds = urlParams.get('pokemon-ids') ? urlParams.get('pokemon-ids').split(',') : [];

// Clean up the IDs (trim spaces, remove leading zeros, and ensure they're valid numbers)
pokemonIds = pokemonIds
    .map(id => id.trim())                        // Remove leading/trailing spaces
    .map(id => id.replace(/^0+/, ''))            // Remove leading zeros
    .filter(id => !isNaN(id) && id !== '');      // Ensure it's a valid number

// Validate that there are exactly 6 IDs
if (pokemonIds.length !== 6) {
    alert('Please enter exactly 6 valid IDs.');
    window.location.href = 'index.html'; // Redirect back to index if not 6 valid IDs
}

// Fetch and display information for each Pokémon
pokemonIds.forEach(id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Pokémon with ID ${id} not found.`);
            }
            return response.json();
        })
        .then(data => {
            const listItem = document.createElement('li');
            const pokemonInfo = `
                <h3>${data.name}</h3>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Height: ${data.height} decimetres</p>
                <p>Weight: ${data.weight} hectograms</p>
                <p>Base Experience: ${data.base_experience}</p>
            `;
            listItem.innerHTML = pokemonInfo;
            document.getElementById('pokemon-list').appendChild(listItem);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const listItem = document.createElement('li');
            listItem.textContent = error.message || 'Error fetching data for Pokémon.';
            document.getElementById('pokemon-list').appendChild(listItem);
        });
});
