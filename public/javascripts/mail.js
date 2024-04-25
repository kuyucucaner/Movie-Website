async function sendMail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email,message }),
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Mail Gönderimi Başarılı!',
                confirmButtonText: 'Tamam',
            }).then(() => {
                window.location.href = '/'; 
            });
        } else {
            const statusCode = response.status;
            console.error('Hata Durum Kodu:', statusCode);
            const responseBody = await response.json();
            if (statusCode === 401) {
                throw new Error(responseBody.error || 'Geçersiz Kullanıcı Adı veya Şifre');
            } else {
                throw new Error(responseBody.error || `Sunucu Hatası: ${statusCode}`);
            }
        }
    } catch (error) {
        console.error('Hata Yakalandı:', error);
        Swal.fire({
            icon: 'error',
            title: 'Mail Gönderimi Başarısız!',
            text: error.message || 'Lütfen bilgilerinizi kontrol edin.',
            confirmButtonText: 'Tamam',
        }).then(() => {
            window.location.href = '/contact';
        });
    }
}

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    await sendMail();
});
