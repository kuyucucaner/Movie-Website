document.addEventListener('DOMContentLoaded', function() {
    const userId = getCookie('id');
  
    fetch('/user-movie-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); 
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift().trim(); 
    }
  });
  