document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('movie-detail-comment-form');
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); 

        try {
            const formData = new FormData(form);
            const spoilerCheckbox = document.getElementById('spoiler-checkbox');
            const spoilerValue = spoilerCheckbox.checked ? '1' : '0';

            // Form verilerine spoiler değerini elle ekleyin
            formData.append('spoiler', spoilerValue);

            // Form verilerini JSON formatına dönüştürün
            const requestBody = {};
            formData.forEach((value, key) => {
                requestBody[key] = value;
            });

            const response = await fetch('/add-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
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
function hideSpoiler(spoiler) {
    // Find the parent spoiler container
    var spoilerContainer = spoiler.closest('.movie-detail-user-comments-spoiler');
    
    if (spoilerContainer !== null) {
        spoilerContainer.style.display = 'none';
    }

}

