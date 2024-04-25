async function register() {
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    
    try {
        const response = await fetch('/register-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, email, password, confirmPassword, name, lastName }),
        });
    
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Başarılı Kayıt İşlemi!',
                text: 'Başarı ile kayıt olundu!',
                confirmButtonText: 'Tamam',
                timer:4000
            }).then(() => {
                window.location.href = '/'; 
            });
        } else {
            const statusCode = response.status;
            console.error('Hata Durum Kodu:', statusCode);

            const responseBody = await response.json();

            if (statusCode === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Kayıt Başarısız!',
                    text: responseBody.errors.join('\n'),
                    confirmButtonText: 'Tamam',
                    timer:4000
                });
            } else if (statusCode === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Kayıt Başarısız!',
                    text: responseBody.error || 'Zaten kayıtlı bir e-posta adresi.',
                    confirmButtonText: 'Tamam',
                    timer:4000
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Kayıt Başarısız!',
                    text: responseBody.error || `Sunucu Hatası: ${statusCode}`,
                    confirmButtonText: 'Tamam',
                    timer:4000
                });
            }
        }
    } catch (error) {
        console.error('Hata Yakalandı:', error);
        Swal.fire({
            icon: 'error',
            title: 'Kayıt Başarısız!',
            text: error.message || 'Lütfen bilgilerinizi kontrol edin.',
            confirmButtonText: 'Tamam',
            timer:4000
        }).then(() => {
            window.location.href = '/register'; 
        });
    }
}

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await register();
});
