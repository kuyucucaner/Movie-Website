const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const IMDBSevenPlusModel = {
    getIMDBSevenPlusMovies: async function () {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .query(`
                SELECT 
                Movies.MovieName, 
                Movies.MovieImage,
                Movies.ID, 
                Types.MovieType,
                Movies.MovieIMDB,
                Movies.MovieRate,
                Movies.MovieYear,
                Movies.IsFavorited
            FROM 
                Movies
            INNER JOIN 
                Types ON Movies.TypeID = Types.ID
            WHERE
                Movies.MovieIMDB >= 7
            ORDER BY
                Movies.MovieIMDB DESC
                `);
            if (result.recordset && result.recordset.length > 0) {
                const movies = result.recordset; 
                for (let i = 0; i < movies.length; i++) {
                    if (movies[i].MovieImage !== null && movies[i].MovieImage !== undefined) {
                        const base64String = base64.fromByteArray(movies[i].MovieImage);
                        movies[i].MovieImage = `data:image/jpeg;base64,${base64String}`;
                    }
                }
                return movies;
            } else {
                console.error('IMDB +7 Olan Filmler Getirme sorgusu beklenen sonucu döndürmedi.');
                return { error: 'IMDB +7 Olan Filmler Getirme sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }
    }
};

module.exports = IMDBSevenPlusModel;
