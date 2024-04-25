const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const AdminAddMovieModel = {
  adminAddMovie: async function (movieData) {
    const {
      fileBuffer,
      movieTrailer,
      movieVideoFirst,
      movieVideoSecond,
      movieVideoThird,
      movieName,
      categoryId,
      typeId,
      movieYear,
      movieImdb,
      movieRate,
      movieSummary,
      movieDirector,
      movieActorFirst,
      movieActorSecond,
      movieActorThird,
      movieActorFourth,
      movieCountry,
      isFavorited
    } = movieData; 

    try {
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
      
      const result = await request
        .input('movieTrailer', mssql.NVarChar, movieTrailer)
        .input('movieVideoFirst', mssql.NVarChar, movieVideoFirst || null)
        .input('movieVideoSecond', mssql.NVarChar, movieVideoSecond || null)
        .input('movieVideoThird', mssql.NVarChar, movieVideoThird || null)
        .input('movieName', mssql.NVarChar, movieName )
        .input('categoryId', mssql.Int, categoryId)
        .input('typeId', mssql.Int, typeId)
        .input('movieYear', mssql.NVarChar, movieYear)
        .input('movieImdb', mssql.Float, movieImdb)
        .input('movieRate', mssql.Float, movieRate )
        .input('movieSummary', mssql.NVarChar, movieSummary )
        .input('movieDirector', mssql.NVarChar, movieDirector )
        .input('movieActorFirst', mssql.NVarChar, movieActorFirst )
        .input('movieActorSecond', mssql.NVarChar, movieActorSecond )
        .input('movieActorThird', mssql.NVarChar, movieActorThird )
        .input('movieActorFourth', mssql.NVarChar, movieActorFourth )
        .input('movieCountry', mssql.NVarChar, movieCountry)
        .input('isFavorited', mssql.Bit, isFavorited)
        .input('photo', mssql.VarBinary, fileBuffer)
        .query(`
          INSERT INTO Movies (MovieTrailer, MovieVideoFirst, MovieVideoSecond, MovieVideoThird, MovieName, CategoryID, TypeID, MovieYear, MovieIMDB, MovieRate, MovieSummary, MovieDirector, MovieActorFirst, MovieActorSecond, MovieActorThird, MovieActorFourth, MovieCountry, IsFavorited, MovieImage)
          VALUES (@movieTrailer, @movieVideoFirst, @movieVideoSecond, @movieVideoThird, @movieName, @categoryId, @typeId, @movieYear, @movieImdb, @movieRate, @movieSummary, @movieDirector, @movieActorFirst, @movieActorSecond, @movieActorThird, @movieActorFourth, @movieCountry, @isFavorited, @photo)
        `);

      if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
        console.log('Film başarıyla eklenmiştir.');
        return { success: 'Film başarıyla eklenmiştir.' };
      } else {
        console.error('Film eklenme sorgusu beklenen sonucu döndürmedi.');
        console.error(result); 
        return { error: 'Film eklenme sorgusu beklenen sonucu döndürmedi.' };
      }
    } catch (err) {
      console.error('Hata: ', err);
      console.error('Film eklenme sırasında bir hata oluştu:', err.message);
      return { error: 'Film eklenme sırasında bir hata oluştu: ' + err.message };
    }
  },
};

module.exports = AdminAddMovieModel;
