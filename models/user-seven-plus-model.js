const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const UserSevenPlusModel = {
    getUserSevenPlusMovies: async function () {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .query(`
                SELECT 
                Movies.MovieName, 
                Movies.MovieImage,
                Types.MovieType,
                Movies.MovieIMDB,
                Movies.ID, 
                Movies.MovieRate,
                Movies.MovieYear,
                Movies.IsFavorited,
                COUNT(UserLikeLists.IsLiked) AS LikeCount,
                COUNT(UserDislikeLists.IsDisliked) AS DislikeCount
            FROM 
                Movies
            INNER JOIN 
                Types ON Movies.TypeID = Types.ID
            LEFT JOIN
                UserLikeLists ON Movies.ID = UserLikeLists.MovieID AND UserLikeLists.IsLiked = 1
            LEFT JOIN
                UserDislikeLists ON Movies.ID = UserDislikeLists.MovieID AND UserDislikeLists.IsDisliked = 1
            WHERE
                Movies.MovieRate >= 7
            GROUP BY
                Movies.MovieName, 
                Movies.MovieImage,
                Types.MovieType,
                Movies.MovieIMDB,
                Movies.ID, 
                Movies.MovieRate,
                Movies.MovieYear,
                Movies.IsFavorited
            ORDER BY
                Movies.MovieRate DESC;            
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
                console.error('User +7 Olan Filmler Getirme sorgusu beklenen sonucu döndürmedi.');
                return { error: 'User +7 Olan Filmler Getirme sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }
    }
};

module.exports = UserSevenPlusModel;
