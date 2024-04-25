const likeCommentButtons = document.querySelectorAll('.movie-detail-user-comments-like');

likeCommentButtons.forEach(likeCommentButton => {
    likeCommentButton.addEventListener('click', async () => {
        const movieId = document.getElementById('movieId').value;
        const userId = getCookie('id');
        const commentId = likeCommentButton.getAttribute('data-comment-like-id');
         console.log('movieId : ' , movieId);
        console.log('userId : ' , userId);
        console.log('commentId : ' , commentId);
        if (!userId) {
            Swal.fire({
                title: 'Hata!',
                text: 'Lütfen Giriş Yapınız!',
                icon: 'warning',
                timer: 4000,
            });
            return; 
        }

        try {
            const response = await fetch('/movie-comment-like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentId, userId ,movieId })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Network response was not ok');
            }
            window.location.href = '/movie-detail/' + movieId;      
           } catch (error) {
            console.error('Hata:', error);

            Swal.fire({
                title: 'Hata!',
                text: error.message || 'Bir hata oluştu!',
                icon: 'error',
                timer: 4000,
            });
        }
    });
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift().trim();
}
