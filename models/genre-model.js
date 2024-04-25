const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const GenreModel = {
    getGenreByCategoryID: async function (category) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('categoryId', mssql.Int, category)
                .query(`
                SELECT *
                FROM Movies
                WHERE CategoryID = @categoryId
            `);
            if (result.recordset && result.recordset.length > 0) {
                const movies = result.recordset.map(movie => {
                    if (movie.MovieImage !== null && movie.MovieImage !== undefined) {
                        const base64String = base64.fromByteArray(movie.MovieImage);
                        movie.MovieImage = `data:image/jpeg;base64,${base64String}`;
                    }
                    return movie;
                });
                return movies;
            } else {
                console.error('Category sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Category sorgusu beklenen sonucu döndürmedi.' };
            }
          
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }

    },
}
module.exports = GenreModel;
