document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('comment-answer-section-form-user');
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); 

        try {
            const formData = new FormData(form);

            // FormData nesnesini JSON formatına dönüştür
            const jsonObject = {};
            formData.forEach((value, key) => {
                jsonObject[key] = value;
            });

            const response = await fetch('/add-comment-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonObject), // JSON formatında gönder
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            Swal.fire({
                title: 'Başarılı!',
                text: 'Yorum Başarıyla Eklendi.',
                icon: 'success',
                timer: 4000,
            }).then(() => {
                const movieId = document.getElementById('movieId').value;
                window.location.href = '/movie-detail/' + movieId;    
            });

            console.log('Yorum başarıyla eklendi:', data);
        } catch (error) {
            console.error('Hata:', error);

            Swal.fire({
                title: 'Hata!',
                text: 'Yorum eklenirken bir hata oluştu!',
                icon: 'error',
                timer: 4000,
            }).then(() => {
                window.location.reload();
            });
        }
    });
});

function toggleComments(commentID) {
    var commentAnswerSection = document.getElementById("comment-answer-section-" + commentID);
    commentAnswerSection.classList.toggle("hidden-answer-section");
}
