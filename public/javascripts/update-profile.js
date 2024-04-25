const photoInput = document.getElementById('photo');
const previewImage = document.getElementById('previewImage');
const updateProfileForm = document.getElementById('updateProfileForm');
const existingPhotoUrlInput = document.getElementById('existingPhoto');

photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        previewImage.src = imageURL;
    }
});
async function updateChanges() {
    try {
        const formData = new FormData();
        formData.append('photo', photoInput.files.length > 0 ? photoInput.files[0] : existingPhotoUrlInput.value);
        formData.append('name', document.getElementById('name').value);
        formData.append('lastName', document.getElementById('lastName').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('userName', document.getElementById('userName').value);        
        document.getElementById('submitButton').disabled = true;

        const response = await fetch('/profile-update', {
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
                text: 'Profil başarıyla güncellendi.',
                icon: 'success',
                timer: 4000,
            }).then(() => {
                window.location.href = '/profile';
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
                text: `Profil güncellenirken bir hata oluştu: ${errorData ? errorData.error : response.statusText}`,
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

updateProfileForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await updateChanges();
});