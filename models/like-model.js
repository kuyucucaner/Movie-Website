const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const LikeModel = {
  addMovieLike: async function (data) {
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
        .input('isLiked', mssql.Bit, 1)
        .query(`
          INSERT INTO UserLikeLists (UserID,MovieID , IsLiked)
          VALUES ( @userId ,@movieId , @isLiked)
        `);
      if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
        console.log('Film başarıyla beğenildi.');
        return { success: 'Film başarıyla beğenildi.' };
      } else {
        console.error('Film beğenme sorgusu beklenen sonucu döndürmedi.');
        console.error(result); 
        return { error: 'Film beğenme sorgusu beklenen sonucu döndürmedi.' };
      }
    } catch (err) {
      console.error('Hata: ', err);
      console.error('Film beğenme sırasında bir hata oluştu:', err.message);
      return { error: 'Film beğenme sırasında bir hata oluştu: ' + err.message };
    }
  },
};

module.exports = LikeModel;
