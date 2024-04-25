const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const DubbingModel = {
    getDubbingedMovies: async function () {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .query(`
                SELECT 
                Movies.ID, 
                Movies.MovieName, 
                Movies.MovieImage,
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
                Movies.TypeID = 1 OR Movies.TypeID = 3
            
                `);
            console.log('Result Dubbing: ', result);
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
                console.error('Dublajlı Filmleri Getirme sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Dublajlı Filmleri Getirme sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }
    }
};

module.exports = DubbingModel;
