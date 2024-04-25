const photoInput = document.getElementById('photo');
const previewImage = document.getElementById('previewImage');
const addMovieForm = document.getElementById('add-movie-form');
const existingPhotoUrlInput = document.getElementById('existingPhoto');

document.addEventListener('DOMContentLoaded', function () {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const stepFinal = document.getElementById('stepFinal');
    const nextStep1Button = document.getElementById('nextStep1');
    const prevStep2Button = document.getElementById('prevStep2');
    const nextStep2Button = document.getElementById('nextStep2');
    const prevStepFinalButton = document.getElementById('prevStepFinal');

    // Adım 1'den Adım 2'ye geçiş
    nextStep1Button.addEventListener('click', function () {
        step1.style.display = 'none';
        step2.style.display = 'block';
    });

    // Adım 2'den Adım 1'e geri dönüş
    prevStep2Button.addEventListener('click', function () {
        step2.style.display = 'none';
        step1.style.display = 'block';
    });

    // Adım 2'den Son Adıma geçiş
    nextStep2Button.addEventListener('click', function () {
        step2.style.display = 'none';
        stepFinal.style.display = 'block';
    });

    // Son Adımdan Adım 2'ye geri dönüş
    prevStepFinalButton.addEventListener('click', function () {
        stepFinal.style.display = 'none';
        step2.style.display = 'block';
    });
});

photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        previewImage.src = imageURL;
    }
});

async function addMovie() {
    try {
        const formData = new FormData();
        formData.append('photo', photoInput.files.length > 0 ? photoInput.files[0] : existingPhotoUrlInput.value);
        formData.append('movieTrailer', document.getElementById('add-movie-trailer').value);
        formData.append('movieVideoFirst', document.getElementById('add-movie-first-video').value);
        formData.append('movieVideoSecond', document.getElementById('add-movie-second-video').value);
        formData.append('movieVideoThird', document.getElementById('add-movie-third-video').value);
        formData.append('movieName', document.getElementById('add-movie-name').value);
        formData.append('categoryId', document.getElementById('add-movie-category').value);
        formData.append('typeId', document.getElementById('add-movie-type').value);           
        formData.append('movieYear', document.getElementById('add-movie-year').value);
        formData.append('movieImdb', document.getElementById('add-movie-imdb').value);
        formData.append('movieRate', document.getElementById('add-movie-rate').value);
        formData.append('movieSummary', document.getElementById('add-movie-summary').value);
        formData.append('movieDirector', document.getElementById('add-movie-director').value);
        formData.append('movieActorFirst', document.getElementById('add-movie-first-actor').value);
        formData.append('movieActorSecond', document.getElementById('add-movie-second-actor').value);
        formData.append('movieActorThird', document.getElementById('add-movie-third-actor').value);
        formData.append('movieActorFourth', document.getElementById('add-movie-fourth-actor').value);
        formData.append('movieCountry', document.getElementById('add-movie-fourth-country').value);
        formData.append('isFavorited', document.getElementById('add-movie-favorite').value);
        
        document.getElementById('submitButton').disabled = true;

        const response = await fetch('/add-movie', {
            method: 'POST',
            body: formData,
        });

        console.log('Sunucu cevabı:', response);

        document.getElementById('submitButton').disabled = false;

        if (response.ok) {
            const responseData = await response.json();
            console.log('Sunucu cevap verisi:', responseData);

            Swal.fire({
                title: 'Başarılı!',
                text: 'Film Başarıyla Eklendi.',
                icon: 'success',
                timer: 4000,
            }).then(() => {
                window.location.href = '/admin-add-movie';
            });
        } else {
            console.error('Sunucu cevap hatası:', response.status, response.statusText);

            let errorData;
            try {
                errorData = await response.json();
            } catch (error) {
                console.error('Sunucu cevabı JSON verisi içermiyor.');
            }

            Swal.fire({
                title: 'Hata!',
                text: `Film eklenirken bir hata oluştu: ${errorData ? errorData.error : response.statusText}`,
                icon: 'error',
                timer: 4000,
            }).then(() => {
                window.location.reload();
            });
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        Swal.fire({
            title: 'Hata!',
            text: 'Bir şeyler yanlış gitti.',
            icon: 'error',
        });
    }
}

addMovieForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addMovie();
});