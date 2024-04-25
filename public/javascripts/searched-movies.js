const moviesPerPage = 12;
let currentPage = 1;
let movies = JSON.parse(localStorage.getItem('searchedMovies'))
const moviesContainer = document.getElementById('movies-container');
const paginationContainer = document.getElementById('pagination');

function displayMovies() {
  displayPage(currentPage);
}

function displayPage(page) {
  moviesContainer.innerHTML = '';
  if (movies.error) {
    const emptyList = document.createElement('h1');
    emptyList.classList.add('empty-list');
    emptyList.innerHTML = `Bu Yıl Aralığına Ait Film Bulunamadı...`;
    moviesContainer.appendChild(emptyList);
    return;
  }
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
    overlayText.classList.add('searched-overlay-text');
    overlayText.textContent = movie.MovieName;

    const typeText = document.createElement('div');
    typeText.classList.add('searched-type-text');
    if (movie.TypeID === 1) {
      typeText.innerHTML = `<i class="bi bi-translate"></i> Türkçe Dublaj`;
    } else if (movie.TypeID === 2) {
      typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i>  Türkçe Altyazılı`;
    } else if (movie.TypeID === 3) {
      typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i> <i class="bi bi-translate"></i> Dublaj & Altyazılı`;
    }

    const IMDBtext = document.createElement('div');
    IMDBtext.classList.add('searched-imdb-text');
    IMDBtext.innerHTML = `<i class="bi bi-star"></i>  ${movie.MovieIMDB}`;

    const rateText = document.createElement('div');
    rateText.classList.add('searched-rate-text');
    rateText.innerHTML = `<i class="bi bi-film"></i>  ${movie.MovieRate}`;

    const yearText = document.createElement('div');
    yearText.classList.add('searched-year-text');
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
  const movieIndex = Array.from(movieItem.parentNode.children).indexOf(movieItem); // Mevcut film öğesinin index'ini al
  const movie = movies[(currentPage - 1) * moviesPerPage + movieIndex]; // movies dizisinden ilgili filmi al
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

function updatePagination() {
  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(movies.length / moviesPerPage);
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
      updatePagination();
      updateActiveButton();
    });
    paginationContainer.appendChild(button);
  }

  const searchedButton = document.createElement('button');
  searchedButton.innerText = 'Son';
  searchedButton.addEventListener('click', () => {
    currentPage = pageCount;
    displayPage(currentPage);
    updatePagination();
    updateActiveButton();
  });
  paginationContainer.appendChild(searchedButton);

  const firstButton = document.createElement('button');
  firstButton.innerText = 'İlk';
  firstButton.addEventListener('click', () => {
    currentPage = 1;
    displayPage(currentPage);
    updatePagination(); 
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

displayMovies();
updatePagination();
