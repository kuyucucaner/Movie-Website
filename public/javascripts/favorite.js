const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

fetch('/favorited-movies')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    updateSliderWithData(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = slider.children.length - 1;
  } else {
    currentSlide--;
  }
  updateSlider();
}

function nextSlide() {
  if (currentSlide === slider.children.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  updateSlider();
}

function updateSlider() {
  const slideWidth = slider.children[0].offsetWidth;
  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function updateSliderWithData(data) {
  slider.innerHTML = ''; 

  for (let i = 0; i < data.length; i += 6) {
    const slideGroup = data.slice(i, i + 6);

    const slideContainer = document.createElement('div');
    slideContainer.classList.add('slide-group');

    slideGroup.forEach(movie => {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      const imgContainer = document.createElement('div'); 
      imgContainer.classList.add('img-container');
      imgContainer.dataset.movieId = movie.ID; 
      const img = document.createElement('img');
      img.src = movie.MovieImage;
      img.alt = movie.MovieName;

      const overlayText = document.createElement('div');
      overlayText.classList.add('overlay-text');
      overlayText.textContent = movie.MovieName;

      const typeText = document.createElement('div');
      typeText.classList.add('type-text');
      if (movie.MovieType === 'Türkçe Dublaj') {
        typeText.innerHTML = `<i class="bi bi-translate"></i> ${movie.MovieType}`;
      } else if (movie.MovieType === 'Türkçe Altyazılı') {
        typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i>  ${movie.MovieType}`;
      } else if (movie.MovieType === 'Dublaj & Altyazılı') {
        typeText.innerHTML = `<i class="bi bi-badge-cc-fill"></i> <i class="bi bi-translate"></i> ${movie.MovieType}`;
      }
      const IMDBtext = document.createElement('div');
      IMDBtext.classList.add('imdb-text');
      IMDBtext.innerHTML = `<i class="bi bi-star"></i>  ${movie.MovieIMDB}`;

      const rateText = document.createElement('div');
      rateText.classList.add('rate-text');
      rateText.innerHTML = `<i class="bi bi-film"></i>  ${movie.MovieRate}`;

      const yearText = document.createElement('div');
      yearText.classList.add('year-text');
      yearText.innerHTML = `<i class="bi bi-calendar3"></i> ${movie.MovieYear}`;

      imgContainer.appendChild(img);
      imgContainer.appendChild(overlayText); 
      imgContainer.appendChild(typeText);
      imgContainer.appendChild(IMDBtext);
      imgContainer.appendChild(rateText);
      imgContainer.appendChild(yearText);
      slide.appendChild(imgContainer);
      slideContainer.appendChild(slide);
    });

    slider.appendChild(slideContainer);
  }

  currentSlide = 0;
  updateSlider();

  const imgContainers = document.querySelectorAll('.img-container');
  imgContainers.forEach(imgContainer => {
    imgContainer.addEventListener('mouseenter', showFavoritePlayButton);
    imgContainer.addEventListener('mouseleave', hidePlayButton);
  });
}

function showFavoritePlayButton(event) {
  const movieId = event.currentTarget.dataset.movieId; 
  const playButton = document.createElement('a'); 
  playButton.classList.add('play-button');
  playButton.href = `/movie-detail/${movieId}`; 
  playButton.innerHTML = '<i class="bi bi-play-circle"></i>';
  event.currentTarget.appendChild(playButton);
}

function hidePlayButton(event) {
  const playButton = event.currentTarget.querySelector('.play-button');
  if (playButton) {
    playButton.remove();
  }
}
