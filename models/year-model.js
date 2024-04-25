const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const YearModel = {
    getMoviesByYearRange: async function (endYear ,startYear) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('endYear', mssql.NVarChar, endYear)
                .input('startYear', mssql.NVarChar, startYear)
                .query(`
                SELECT *
                FROM Movies
                WHERE MovieYear BETWEEN @endYear AND @startYear
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
                console.error('Yıl aralığına göre filmler bulunamadı.');
                return { error: 'Yıl aralığına göre filmler bulunamadı.' };
            }
        } catch (err) {
            console.error('Hata:', err);
            return { error: err.message };
        }
    }
};

module.exports = YearModel;
