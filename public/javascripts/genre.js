const genreItems = document.querySelectorAll('.genre-item');

genreItems.forEach(item => {
    item.addEventListener('click', async function() {
        const genreId = item.getAttribute('data-genre');
        try {
            const response = await fetch('/genre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryId: genreId })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('genredMovies', JSON.stringify(data));
                console.log('Response:', data);
                window.location.href = '/genred-movies';
            } else {
                console.error('HTTP error:', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
});
