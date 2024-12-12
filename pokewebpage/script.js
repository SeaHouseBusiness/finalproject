// Get the Pokémon IDs from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const pokemonIds = urlParams.get('pokemon-ids') ? urlParams.get('pokemon-ids').split(',') : [];

if (pokemonIds.length !== 6) {
    alert('Please enter exactly 6 IDs.');
    // Optionally, redirect the user back to the index page or display a warning
    window.location.href = 'index.html'; // Redirect back to index if not 6 IDs
}

pokemonIds.forEach(id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id.trim()}`)
        .then(response => response.json())
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
            listItem.textContent = `Error fetching data for Pokémon ID ${id.trim()}`;
            document.getElementById('pokemon-list').appendChild(listItem);
        });
});
