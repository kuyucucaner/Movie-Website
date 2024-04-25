document.addEventListener('DOMContentLoaded', function () {
    const isUserLogged = getCookie('userLoggedIn');
    const isLoggedIn = getCookie('isLoggedIn');
    const userRole = getCookie('userRole');
  
    if (isUserLogged === 'true' || isLoggedIn === 'true') {
      document.getElementById('loginButton').style.display = 'none';
      document.getElementById('registerButton').style.display = 'none';
      document.getElementById('exitButton').style.display = 'block';
      document.getElementById('profileButton').style.display = 'block';
  
      if (parseInt(userRole) === 1) { 
        document.getElementById('add-movie-button').style.display = 'block';
      } else {
        document.getElementById('add-movie-button').style.display = 'none';
      }
    } else if (isUserLogged === 'false' || isLoggedIn === 'false') {
      document.getElementById('loginButton').style.display = 'block';
      document.getElementById('registerButton').style.display = 'block';
      document.getElementById('exitButton').style.display = 'none';
      document.getElementById('profileButton').style.display = 'none';
      document.getElementById('add-movie-button').style.display = 'none';
  
      Swal.fire({
        icon: 'warning',
        title: 'Üyelik Sona Erdi!',
        html: `Lütfen Tekrar Giriş Yapınız!`,
        confirmButtonText: 'Tamam',
        timer: 5000
      });
      setCookie('userLoggedIn', 'undefined', 1);
      setCookie('isLoggedIn', 'undefined', 1);
    } else {
      document.getElementById('loginButton').style.display = 'block';
      document.getElementById('registerButton').style.display = 'block';
      document.getElementById('exitButton').style.display = 'none';
      document.getElementById('profileButton').style.display = 'none';
      document.getElementById('add-movie-button').style.display = 'none';
    }
  });
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift().trim(); // trim() ekledim
  }
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  