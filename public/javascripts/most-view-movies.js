fetch('/most-viewed-movies')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayMovies(data);
    updatePagination(data.length);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

const moviesPerPage = 12; 
let currentPage = 1;
let movies = []; 
const moviesContainer = document.getElementById('movies-container');
const paginationContainer = document.getElementById('pagination');

function displayMovies(data) {
  movies = data; 
  displayPage(currentPage);
}

function displayPage(page) {
  moviesContainer.innerHTML = '';
  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const displayedMovies = movies.slice(startIndex, endIndex);

  displayedMovies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML = `
        <img src="${movie.MovieImage}" alt="${movie.MovieName}">
    `;

    const overlayText = document.createElement('div');
    overlayText.classList.add('view-overlay-text');
    overlayText.textContent = movie.MovieName;

    const typeText = document.createElement('div');
    typeText.classList.add('view-type-text');
    if (movie.MovieType === 'Türkçe Dublaj') {
        typeText.innerHTML = `<i class="bi bi-translate"></i> ${movie.MovieType}`;
    } else if (movie.MovieType === 'Türkçe Altyazılı') {
        typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i>  ${movie.MovieType}`;
    } else if (movie.MovieType === 'Dublaj & Altyazılı') {
        typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i> <i class="bi bi-translate"></i> ${movie.MovieType}`;
    }

    const IMDBtext = document.createElement('div');
    IMDBtext.classList.add('view-imdb-text');
    IMDBtext.innerHTML = `<i class="bi bi-star"></i>  ${movie.MovieIMDB}`;

    const rateText = document.createElement('div');
    rateText.classList.add('view-rate-text');
    rateText.innerHTML = `<i class="bi bi-film"></i>  ${movie.MovieRate}`;

    const yearText = document.createElement('div');
    yearText.classList.add('view-year-text');
    yearText.innerHTML = `<i class="bi bi-calendar3"></i> ${movie.MovieYear}`;

    moviesContainer.appendChild(movieItem);
    movieItem.appendChild(overlayText);
    movieItem.appendChild(typeText);
    movieItem.appendChild(IMDBtext);
    movieItem.appendChild(rateText);
    movieItem.appendChild(yearText);
});
 const movieItems = document.querySelectorAll('.movie-item');
 movieItems.forEach(movieItem => {
  movieItem.addEventListener('mouseenter', showPlayButton);
  movieItem.addEventListener('mouseleave', hidePlayButton);
 });
}
function showPlayButton(event) {
  const movieItem = event.currentTarget;
  const movieIndex = Array.from(movieItem.parentNode.children).indexOf(movieItem); 
  const movie = movies[(currentPage - 1) * moviesPerPage + movieIndex]; 
  const playButton = document.createElement('a');
  playButton.classList.add('play-button');
  playButton.href = `/movie-detail/${movie.ID}`;
  playButton.innerHTML = '<i class="bi bi-play-circle"></i>';
  movieItem.appendChild(playButton);
}

function hidePlayButton(event) {
  const playButton = event.currentTarget.querySelector('.play-button');
  if (playButton) {
    playButton.remove();
  }
}

function updatePagination(totalMovies) {
  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(totalMovies / moviesPerPage);
  let startPage = 1;
  let endPage = Math.min(pageCount, 3); 
  if (currentPage > 2 && currentPage < pageCount) {
    startPage = currentPage - 1;
    endPage = currentPage + 1;
    if (endPage === pageCount) {
      startPage = pageCount - 2;
    } else if (startPage === 1) {
      endPage = 3;
    }
  } else if (currentPage === pageCount) { 
    startPage = Math.max(1, pageCount - 2);
    endPage = pageCount;
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', () => {
      currentPage = i;
      displayPage(currentPage);
      updatePagination(totalMovies); 
      updateActiveButton();
    });
    paginationContainer.appendChild(button);
  }

  const viewButton = document.createElement('button');
  viewButton.innerText = 'Son';
  viewButton.addEventListener('click', () => {
    currentPage = pageCount;
    displayPage(currentPage);
    updatePagination(totalMovies); 
    updateActiveButton();
  });
  paginationContainer.appendChild(viewButton);

  const firstButton = document.createElement('button');
  firstButton.innerText = 'İlk';
  firstButton.addEventListener('click', () => {
    currentPage = 1;
    displayPage(currentPage);
    updatePagination(totalMovies);
    updateActiveButton();
  });
  paginationContainer.insertBefore(firstButton, paginationContainer.firstChild);

  updateActiveButton();
}



function updateActiveButton() {
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach(button => {
    if (parseInt(button.innerText) === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

displayPage(currentPage);
