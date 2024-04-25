const yearItems = document.querySelectorAll('.year-item');

yearItems.forEach(yearItem => {
    yearItem.addEventListener('click', async () => {
        const yearRange = yearItem.dataset.genre.split('-');
        const startYear = yearRange[0];
        const endYear = yearRange[1];
        try {
            const response = await fetch('/year', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ startYear, endYear })
            });

            if (!response.ok) {
                throw new Error('Yıl aralığına göre filmler alınamadı.');
            }

            const movies = await response.json();
            localStorage.setItem('yearedMovies', JSON.stringify(movies));
            console.log('Yıl aralığına göre filmler:', movies);
            window.location.href = '/yeared-movies';

        } catch (error) {
            console.error('Hata:', error.message);
        }
    });
});
