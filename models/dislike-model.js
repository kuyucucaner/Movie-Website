const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const DislikeModel = {
  addMovieDislike: async function (data) {
    const {
        userId,
        movieId,
    } = data; 
    try {
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
      const result = await request
        .input('userId', mssql.Int, userId )
        .input('movieId', mssql.Int, movieId)
        .input('isDisliked', mssql.Bit, 1)
        .query(`
          INSERT INTO UserDislikeLists (UserID,MovieID , IsDisliked)
          VALUES ( @userId ,@movieId , @isDisliked)
        `);
      if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
        console.log('Film beğenilmedi.');
        return { success: 'Film beğenilmedi' };
      } else {
        console.error('Film beğenmeme sorgusu beklenen sonucu döndürmedi.');
        console.error(result); 
        return { error: 'Film beğenmeme sorgusu beklenen sonucu döndürmedi.' };
      }
    } catch (err) {
      console.error('Hata: ', err);
      console.error('Film beğenmeme sırasında bir hata oluştu:', err.message);
      return { error: 'Film beğenmeme sırasında bir hata oluştu: ' + err.message };
    }
  },
};

module.exports = DislikeModel;
