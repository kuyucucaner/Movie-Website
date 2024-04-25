const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');


const MovieDetailModel = {
    getMovieDetailByMovieID: async function (movieId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('id', mssql.Int, movieId)
                .query(`SELECT
                Movies.MovieTrailer,
                Movies.MovieVideoFirst,
                Movies.MovieVideoSecond,
                Movies.MovieVideoThird,
                Movies.MovieSummary,
                Movies.MovieDirector,
                Movies.MovieActorFirst,
                Movies.MovieActorSecond,
                Movies.MovieActorThird,
                Movies.MovieActorFourth,
                Movies.MovieName, 
                Movies.MovieImage,
                Movies.MoviePublishDate,
                Movies.MovieCountry,
                Types.MovieType,
                Categories.CategoryName,
                Movies.CategoryID,
                Movies.MovieIMDB,
                Movies.MovieRate,
                Movies.MovieYear,
                Movies.ID, 
                Movies.IsFavorited,
                Movies.MovieViews,
                COUNT(DISTINCT UserLikeLists.UserID) AS LikeCount,
                COUNT(DISTINCT UserDislikeLists.UserID) AS DislikeCount
            FROM 
                Movies
            INNER JOIN 
                Types ON Movies.TypeID = Types.ID 
            INNER JOIN 
                Categories ON Movies.CategoryID = Categories.ID
            LEFT JOIN
                UserLikeLists ON Movies.ID = UserLikeLists.MovieID
            LEFT JOIN
                UserDislikeLists ON Movies.ID = UserDislikeLists.MovieID
            WHERE 
                Movies.ID = @id
            GROUP BY
                Movies.MovieTrailer,
                Movies.MovieVideoFirst,
                Movies.MovieVideoSecond,
                Movies.MovieVideoThird,
                Movies.MovieSummary,
                Movies.MovieDirector,
                Movies.MovieActorFirst,
                Movies.MovieActorSecond,
                Movies.MovieActorThird,
                Movies.MovieActorFourth,
                Movies.MovieName, 
                Movies.MovieImage,
                Movies.MoviePublishDate,
                Movies.MovieCountry,
                Types.MovieType,
                Categories.CategoryName,
                Movies.CategoryID,
                Movies.MovieIMDB,
                Movies.MovieRate,
                Movies.MovieYear,
                Movies.ID, 
                Movies.IsFavorited,
                Movies.MovieViews            
            `);
            if (result.rowsAffected && result.rowsAffected[0] === 1) {
                const movie = result.recordset[0];
                if (movie.MovieImage !== null && movie.MovieImage !== undefined) {
                    const base64String = base64.fromByteArray(movie.MovieImage);
                    movie.MovieImage = `data:image/jpeg;base64,${base64String}`;
                }
                return movie; // Sadece bir haber detayını döndür
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
}
module.exports = MovieDetailModel;