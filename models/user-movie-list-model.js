const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const UserMovieListModel = {
    getUserMovieList: async function (userId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('userId', mssql.Int, userId)
                .query(`
                SELECT 
                Movies.MovieName, 
                Movies.MovieImage,
                Users.UserName,
                Movies.MovieIMDB,
                Movies.ID, 
                Movies.MovieRate,
                Movies.MovieYear
            FROM 
                UserMovieLists
            INNER JOIN 
                Movies ON UserMovieLists.MovieID = Movies.ID    
            INNER JOIN 
                Users ON UserMovieLists.UserID = Users.ID
            WHERE
                 UserMovieLists.UserID = @userId
            ORDER BY
                UserMovieLists.DateAdded DESC
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
                console.error('Kullanıcının Listesinde  Olan Filmleri Getirme sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Kullanıcının Listesinde  Olan Filmleri Getirme sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; // Hata durumunda bir nesne döndür
        }
    }
};

module.exports = UserMovieListModel;
