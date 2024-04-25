const moviesPerPage = 12; 
let currentPage = 1;
let movies = JSON.parse(localStorage.getItem('genredMovies'))
const moviesContainer = document.getElementById('movies-container');
const paginationContainer = document.getElementById('pagination');

function displayMovies() {
  const categoryTitles = {
    1: "Aile Filmleri",
    2: "Aksiyon Filmleri",
    3: "Animasyon Filmleri",
    4: "Belgeseller",
    5: "Bilim Kurgu Filmleri",
    6: "Blu Ray Filmler",
    7: "Çizgi Filmler",
    8: "Dram Filmleri",
    9: "Fantastik Filmler",
    10: "Gerilim Filmleri",
    11: "Gizem Filmleri",
    12: "Komedi Filmleri",
    13: "Korku Filmleri",
    14: "Macera Filmleri",
    15: "Müzikal Filmler",
    16: "Polisiye Filmleri",
    17: "Psikolojik Filmler",
    18: "Romantik Filmler",
    19: "Savaş Filmleri",
    20: "Suç Fimleri",
    21: "Tarih Filmleri",
    22: "Western Filmler",
    23: "Yerli Filmler",
  };

  const categoryID = movies.length > 0 ? movies[0].CategoryID : "";
  const title = categoryTitles[categoryID] || "Kategoriye Göre Filmler";

  const genredMoviesTitle = document.querySelector('.genred-movies-title');
  genredMoviesTitle.innerHTML = `<i class="bi bi-play-circle-fill"></i> ${title}`;
  displayPage(currentPage);
}

function displayPage(page) {
  moviesContainer.innerHTML = '';
  console.log('displayed movies  XD : ' , movies);
  if (movies.error) {
    const emptyList = document.createElement('h1');
    emptyList.classList.add('empty-list');
    emptyList.innerHTML = `Kategoriye Ait Film Bulunamadı...`;
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
    overlayText.classList.add('genred-overlay-text');
    overlayText.textContent = movie.MovieName;

    const typeText = document.createElement('div');
    typeText.classList.add('genred-type-text');
    if (movie.TypeID === 1) {
      typeText.innerHTML = `<i class="bi bi-translate"></i> Türkçe Dublaj`;
    } else if (movie.TypeID === 2) {
      typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i>  Türkçe Altyazılı`;
    } else if (movie.TypeID === 3) {
      typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i> <i class="bi bi-translate"></i> Dublaj & Altyazılı`;
    }

    const IMDBtext = document.createElement('div');
    IMDBtext.classList.add('genred-imdb-text');
    IMDBtext.innerHTML = `<i class="bi bi-star"></i>  ${movie.MovieIMDB}`;

    const rateText = document.createElement('div');
    rateText.classList.add('genred-rate-text');
    rateText.innerHTML = `<i class="bi bi-film"></i>  ${movie.MovieRate}`;

    const yearText = document.createElement('div');
    yearText.classList.add('genred-year-text');
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

  // Aralıktaki sayfa butonları
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

  const genredButton = document.createElement('button');
  genredButton.innerText = 'Son';
  genredButton.addEventListener('click', () => {
    currentPage = pageCount;
    displayPage(currentPage);
    updatePagination(); 
    updateActiveButton();
  });
  paginationContainer.appendChild(genredButton);

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
