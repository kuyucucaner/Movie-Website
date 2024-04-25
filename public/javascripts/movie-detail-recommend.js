
function hidePlayButton(event) {
    const playButton = event.currentTarget.querySelector('.play-button');
    if (playButton) {
        playButton.style.display = 'none'; 
    }
}

const movieItems = document.querySelectorAll('.movie-detail-recommend-movie');

movieItems.forEach((movieItem, index) => {
    movieItem.dataset.ID = index + 1; 
    const playButton = movieItem.querySelector('.play-button'); 
    playButton.style.display = 'none'; 
    movieItem.addEventListener('mouseenter', () => { playButton.style.display = 'inline-block'; }); 
    movieItem.addEventListener('mouseleave', hidePlayButton); 
});
