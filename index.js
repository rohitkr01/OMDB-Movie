const apiKeyInput = document.getElementById('apiKeyInput');
const movieTitleInput = document.getElementById('movieTitleInput');
const searchButton = document.getElementById('searchButton');
const loader = document.getElementById('loader');
const resultsContainer = document.getElementById('results');

searchButton.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const movieTitle = movieTitleInput.value.trim();

    if (!apiKey || !movieTitle) {
        alert('Please enter both API key and movie title.');
        return;
    }

    loader.style.display = 'block';
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movies = data.Search;

            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                movieCard.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
                    <h4>${movie.Title} (${movie.Year})</h4>
                    <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
                `;

                resultsContainer.appendChild(movieCard);
            });
        } else {
            alert('No movies found.');
        }
    } catch (error) {
        alert('An error occurred. Please check your API key and try again.');
    }

    loader.style.display = 'none';
});
