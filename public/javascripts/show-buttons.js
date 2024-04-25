document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".comment").forEach(function(comment) {
        comment.style.display = "block";
    });
    document.querySelectorAll(".movie-list").forEach(function(movieList) {
        movieList.style.display = "none";
    }); 
    document.getElementById('show-comments-movies').style.display="none";
    document.getElementById('show-comments-text').style.display="block";
});

document.getElementById("show-comments").addEventListener("click", function() {
    document.querySelectorAll(".comment").forEach(function(comment) {
        comment.style.display = "block";
    });
    document.querySelectorAll(".movie-list").forEach(function(movieList) {
        movieList.style.display = "none";
    });
    document.getElementById('show-comments-movies').style.display="none";
    document.getElementById('show-comments-text').style.display="block";

});

document.getElementById("show-movies").addEventListener("click", function() {
    document.querySelectorAll(".comment").forEach(function(comment) {
        comment.style.display = "none";
    });
    document.querySelectorAll(".movie-list").forEach(function(movieList) {
        movieList.style.display = "block";
    });
    document.querySelectorAll(".show-comments-movies").forEach(function(showCommentsMovies) {
        showCommentsMovies.style.display = "none";
    });
    document.getElementById('show-comments-movies').style.display="block";
    document.getElementById('show-comments-text').style.display="none";
});
