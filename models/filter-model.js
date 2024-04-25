const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const FilterModel = {
    getFilteredMovies: async function (filterOptions) {
        try {
            const pool = await mssql.connect(dbConfig);
            let sql = `
            SELECT
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
            Movies.TypeID,
            Categories.CategoryName,
            Movies.CategoryID,
            Movies.MovieIMDB,
            Movies.MovieRate,
            Movies.MovieYear,
            Movies.ID, 
            Movies.IsFavorited,
            Movies.MovieViews,
            COUNT(DISTINCT Comments.ID) AS CommentCount,
            COUNT(DISTINCT UserLikeLists.UserID) AS LikeCount
        FROM Movies
        INNER JOIN Categories ON Movies.CategoryID = Categories.ID
        LEFT JOIN UserLikeLists ON Movies.ID = UserLikeLists.MovieID 
        LEFT JOIN Comments ON Movies.ID = Comments.MovieID
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
            Movies.TypeID,
            Categories.CategoryName,
            Movies.CategoryID,
            Movies.MovieIMDB,
            Movies.MovieRate,
            Movies.MovieYear,
            Movies.ID, 
            Movies.IsFavorited,
            Movies.MovieViews
              `;
            if (filterOptions.movieRating) {
                switch (parseInt(filterOptions.movieRating)) {
                    case 1:
                        sql += ` ORDER BY MovieIMDB DESC`; 
                        break;
                    case 2:
                        sql += ` ORDER BY MovieViews DESC`;
                        break;
                    case 3:
                        sql += ` ORDER BY LikeCount DESC`;
                        break;
                    case 4:
                        sql += ` ORDER BY CommentCount DESC`;
                        break;
                    case 5:
                        sql += ` ORDER BY MoviePublishDate DESC`;
                        break;
                    case 6:
                        sql += ` ORDER BY MovieName ASC`;
                        break;
                    default:
                        break; 
                }
            }
            if (filterOptions.minImdbRating !== null && filterOptions.minImdbRating !== undefined && filterOptions.minImdbRating !== '') {
                sql += ` AND MovieIMDB >= '${filterOptions.minImdbRating}'`;
            }                             
            if (filterOptions.filmYear !== null && filterOptions.filmYear !== undefined && filterOptions.filmYear !== '') {
                sql += ` AND MovieYear >= ${filterOptions.filmYear}`;
            }
            if (filterOptions.filmGenre !== null && filterOptions.filmGenre !== undefined && filterOptions.filmGenre !== '') {
                sql += ` AND CategoryID = '${filterOptions.filmGenre}'`;
            }
            if (filterOptions.filmLanguage !== null && filterOptions.filmLanguage !== undefined && filterOptions.filmLanguage !== '') {
                sql += ` AND TypeID = '${filterOptions.filmLanguage}'`;
            }

            const result = await pool.request().query(sql);

            if (result.recordset.length > 0) {
                const movies = result.recordset.map(movie => {
                    if (movie.MovieImage !== null && movie.MovieImage !== undefined) {
                        const base64String = base64.fromByteArray(movie.MovieImage);
                        movie.MovieImage = `data:image/jpeg;base64,${base64String}`;
                    }
                    return movie;
                });
                return movies;
            } else {
                console.log('Filtrelenmiş filmler bulunamadı.');
                return [];
            }
        } catch (err) {
            console.error('Hata : ', err);
            return { error: err.message };
        }
    }
};

module.exports = FilterModel;
