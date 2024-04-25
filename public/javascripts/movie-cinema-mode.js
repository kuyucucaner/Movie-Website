// Sinema modu durumunu global olarak tanımla
let cinemaModeEnabled = false;

function toggleCinemaMode() {
    if (!cinemaModeEnabled) {
        document.querySelector('.navbar').style.display = 'none'; 
        document.querySelector('.categories-navbar').style.display = 'none'; 
        document.querySelector('.left-container').style.width = '100%'; 
        document.querySelector('.right-container').style.display = 'none'; 
        document.querySelector('.movie-detail-information').style.display = 'none'; 
        document.querySelector('.movie-detail-recommend-container').style.display = 'none'; 
        document.querySelector('.movie-detail-comment-container').style.display = 'none'; 
        document.querySelector('.footer').style.display = 'none'; 
        document.querySelector('.movie-video-share').style.display = 'none'; 
        document.getElementById('movie-detail-container').style.maxWidth = '100vw';
        document.getElementById('movie-detail-container').style.minWidth = '0px';
        document.getElementById('movie-detail-container').style.minHeight = '0px';   
        document.querySelector('.movie-video').style.height = '600px'; 
        document.querySelector('.movie-video-whole').style.backgroundColor = '#3f3f3f';
        document.getElementById('movie-container').style.backgroundColor = '#353535';
        document.getElementById('movie-detail-container').style.backgroundColor = '#3f3f3f';
        document.querySelector('.movie-container').style.display = null;
        cinemaModeEnabled = true; 
    } else {
        document.querySelector('.navbar').style.display = 'block'; 
        document.querySelector('.categories-navbar').style.display = 'block'; 
        document.querySelector('.movie-video-container').style.display = 'flex'; 
        document.querySelector('.right-container').style.display = 'block'; 
        document.querySelector('.movie-detail-information').style.display = 'block'; 
        document.querySelector('.movie-detail-recommend-container').style.display = 'flex';
        document.querySelector('.movie-detail-comment-container').style.display = 'block'; 
        document.querySelector('.footer').style.display = 'block'; 
        document.getElementById('movie-video-share').style.display = 'flex'; 
        document.getElementById('movie-detail-container').style.maxWidth = '1120px';
        document.getElementById('movie-detail-container').style.minWidth = '1120px';
        document.getElementById('movie-detail-container').style.minHeight = '1163px'; 
        document.querySelector('.movie-video-whole').style.backgroundColor = '#4d4d4d';
        document.getElementById('movie-container').style.backgroundColor = '#6d6d6d';
        document.getElementById('movie-detail-container').style.backgroundColor = '#3f3f3f';
        document.querySelector('.movie-video').style.height = '500px'; 
        document.querySelector('.movie-container').style.display = 'flex';

        cinemaModeEnabled = false; 
    }
}

document.getElementById('cinema-mode-toggle').addEventListener('click', toggleCinemaMode);
