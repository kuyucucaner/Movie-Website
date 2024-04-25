function handleSearch() {
    const query = document.getElementById("searchInput").value.trim();
    
    if (query === "") {
        alert("Lütfen bir arama terimi girin");
        return;
    }

    fetch('/search-movie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('searchedMovies', JSON.stringify(data));
        window.location.href='/searched-movies';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
