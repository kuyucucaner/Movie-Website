const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const SearchModel = {
    getSearchedMovie: async function (query) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('query', mssql.VarChar, `%${query}%`) 
                .query(`
                      SELECT * FROM Movies WHERE MovieName LIKE @query
                 `);
            if (result.recordset && result.recordset.length > 0) {
                const movie = result.recordset.map(movie => {
                    if (movie.MovieImage !== null && movie.MovieImage !== undefined) {
                        const base64String = base64.fromByteArray(movie.MovieImage);
                        movie.MovieImage = `data:image/jpeg;base64,${base64String}`;
                    }
                    return movie;
                });
                return movie;
            } else {
                console.error('Aranan Film Bulunamadı.');
                return { error: 'Aranan Film Bulunamadı.' };
            }
        } catch (err) {
            console.error('Hata:', err);
            return { error: err.message };
        }
    }
};

module.exports = SearchModel;
