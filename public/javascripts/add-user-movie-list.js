const button = document.getElementById('add-list-button');

button.addEventListener('click', async () => {
    const movieId = document.getElementById('movieId').value;
    const userId = getCookie('id');
    
    if (userId) {
        try {
            const response = await fetch('/add-user-movie-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, movieId })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Network response was not ok');
            }

            Swal.fire({
                title: 'Başarılı!',
                text: 'Film Listeye Başarıyla Eklendi.',
                icon: 'success',
                timer: 4000,
            }).then(() => {
                window.location.href = '/movie-detail/' + movieId;
            });

            console.log('Film başarıyla eklendi:', data);
        } catch (error) {
            console.error('Hata:', error);

            Swal.fire({
                title: 'Hata!',
                text: error.message || 'Film listeye eklenirken bir hata oluştu!',
                icon: 'error',
                timer: 4000,
            }).then(() => {
                window.location.reload();
            });
        }
    } else {
        Swal.fire({
            title: 'Hata!',
            text: 'Lütfen Giriş Yapınız!',
            icon: 'warning',
            timer: 4000,
        }).then(() => {
            window.location.reload();
        });
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift().trim(); 
}
