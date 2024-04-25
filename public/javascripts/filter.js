document.addEventListener('DOMContentLoaded', function () {
    const filterForm = document.querySelector('.filter-form');

    filterForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const formData = new FormData(filterForm);

        const filterOptions = {
            MovieIMDB: formData.get('filter-movie-rating'),
           MinMovieIMDB: formData.get('min-imdb-rating'),
            MovieYear: formData.get('filter-film-year'),
            MovieCategory: formData.get('film-genre'),
            MovieType: formData.get('filter-film-language')
        };

        fetch('/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filterOptions)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Filtrelenmiş filmler:', data);
            localStorage.setItem('filteredMovies', JSON.stringify(data));
            window.location.href = '/filtered-movies';
        })
        .catch(error => {
            console.error('Hata:', error);
        });
    });
});
