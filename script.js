let apiKey = '6219ba73400a0f2f9dbbce36657971e4'; // credentials
// Listen to DOM Load Event
window.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('form');

    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        let searchQuery = document.querySelector('input').value;

        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                let movies = data.results;
                let moviesContainer = document.querySelector('.movies');
                console.log(movies);
                displayResults(movies, moviesContainer);


            })
            .catch(error => console.error('Error:', error));
    })

    function displayResults(movies, container) {
        container.innerHTML = '';
        document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movies[0].poster_path})`
        for (let i = 0; i < movies.length; i++) {
            container.innerHTML += ` <div class="movie">
            <img src="${`https://image.tmdb.org/t/p/w500${movies[i].poster_path}`}" alt="">
            <h2><a href="" id="${movies[i].id}">${movies[i].title}</a></h2>
            <p>${movies[i].release_date.split('-')[0]}</p>
        </div>`
        }

        let movieLinks = document.querySelectorAll('.movie a');
        for (let i = 0; i < movieLinks.length; i++) {
            movieLinks[i].addEventListener('click', function (evt) {
                evt.preventDefault();
                fetch(`https://api.themoviedb.org/3/movie/${evt.target.id}?api_key=${apiKey}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(movie) {
                    document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
                })
            })
        }
    }
})