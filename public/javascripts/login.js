async function login() {
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password }),
        });

        if (response.ok) {
            document.cookie = "isLoggedIn=true; path=/"; 
            Swal.fire({
                icon: 'success',
                title: 'Başarılı Giriş!',
                text: `Hoş Geldiniz!`,
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
            title: 'Giriş Başarısız!',
            text: error.message || 'Lütfen bilgilerinizi kontrol edin.',
            confirmButtonText: 'Tamam',
        }).then(() => {
            window.location.href = '/login';
        });
    }
}

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    await login();
});
