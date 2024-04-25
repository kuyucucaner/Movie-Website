const moviesPerPage = 12; 
let currentPage = 1;
let movies = JSON.parse(localStorage.getItem('yearedMovies'))
const moviesContainer = document.getElementById('movies-container');
const paginationContainer = document.getElementById('pagination');

function displayMovies() { 
    const movieYear = movies.length > 0 ? movies[0].MovieYear : "";
    const yearRanges = [
        {start: 2020, end: 2024, label: '2024-2020 Filmleri'},
        {start: 2015, end: 2019, label: '2019-2015 Arası Filmler'},
        {start: 2010, end: 2014, label: '2014-2010 Arası Filmler'},
        {start: 2005, end: 2009, label: '2009-2005 Arası Filmler'},
        {start: 2000, end: 2004, label: '2004-2000 Arası Filmler'},
        {start: 1995, end: 1999, label: '1999-1995 Arası Filmler'},
        {start: 1990, end: 1994, label: '1994-1990 Arası Filmler'},
        {start: 1985, end: 1989, label: '1989-1985 Arası Filmler'},
        {start: 1980, end: 1984, label: '1984-1980 Arası Filmler'},
        {start: 1975, end: 1979, label: '1979-1975 Arası Filmler'},
        {start: 1970, end: 1974, label: '1974-1970 Arası Filmler'},
        {start: 1965, end: 1969, label: '1969-1965 Arası Filmler'},
        {start: 1960, end: 1964, label: '1964-1960 Arası Filmler'},
        {start: 1955, end: 1959, label: '1959-1955 Arası Filmler'},
        {start: 1950, end: 1954, label: '1954-1950 Arası Filmler'},
        {start: 1945, end: 1949, label: '1949-1945 Arası Filmler'},
        {start: 1940, end: 1944, label: '1944-1940 Arası Filmler'},
        {start: 1935, end: 1939, label: '1939-1935 Arası Filmler'},
        {start: 1930, end: 1934, label: '1934-1930 Arası Filmler'},
        {start: 1925, end: 1929, label: '1929-1925 Arası Filmler'},
    ];
    
    
    for (const range of yearRanges) {
        if (movieYear >= range.start && movieYear <= range.end) {
            const yearedMoviesTitle = document.querySelector('.yeared-movies-title');
            yearedMoviesTitle.innerHTML = `<i class="bi bi-play-circle-fill"></i> ${range.label}`;
            break;
        }
        else{
          const yearedMoviesTitle = document.querySelector('.yeared-movies-title');
          yearedMoviesTitle.innerHTML = `<i class="bi bi-play-circle-fill"></i> Yıllara Göre Filmler`;
        }
    }
    
    displayPage(currentPage);
  }

function displayPage(page) {
  moviesContainer.innerHTML = '';
  console.log('displayed movies  XD : ' , movies);
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
    overlayText.classList.add('yeared-overlay-text');
    overlayText.textContent = movie.MovieName;

    const typeText = document.createElement('div');
    typeText.classList.add('yeared-type-text');
    if (movie.TypeID === 1) {
      typeText.innerHTML = `<i class="bi bi-translate"></i> Türkçe Dublaj`;
    } else if (movie.TypeID === 2) {
      typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i>  Türkçe Altyazılı`;
    } else if (movie.TypeID === 3) {
      typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i> <i class="bi bi-translate"></i> Dublaj & Altyazılı`;
    }

    const IMDBtext = document.createElement('div');
    IMDBtext.classList.add('yeared-imdb-text');
    IMDBtext.innerHTML = `<i class="bi bi-star"></i>  ${movie.MovieIMDB}`;

    const rateText = document.createElement('div');
    rateText.classList.add('yeared-rate-text');
    rateText.innerHTML = `<i class="bi bi-film"></i>  ${movie.MovieRate}`;

    const yearText = document.createElement('div');
    yearText.classList.add('yeared-year-text');
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

  const yearedButton = document.createElement('button');
  yearedButton.innerText = 'Son';
  yearedButton.addEventListener('click', () => {
    currentPage = pageCount;
    displayPage(currentPage);
    updatePagination(); 
    updateActiveButton();
  });
  paginationContainer.appendChild(yearedButton);

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
