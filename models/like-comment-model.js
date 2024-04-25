const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const LikeCommentModel = {
  addCommentLike: async function(data) {
    const {
        commentId,
        userId,
        movieId,
    } = data; 
    try {
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
      const result = await request
        .input('commentId', mssql.Int, commentId )
        .input('userId', mssql.Int, userId )
        .input('movieId', mssql.Int, movieId )
        .input('isLiked', mssql.Bit, 1)
        .query(`
        INSERT INTO UserCommentLikes (CommentID , UserID , MovieID , IsLiked)
        VALUES ( @commentId , @userId , @movieId , @isLiked)
        `);
      if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
        console.log('Yorum başarıyla beğenildi.');
        return { success: 'Yorum başarıyla beğenildi.' };
      } else {
        console.error('Yorum beğenme sorgusu beklenen sonucu döndürmedi.');
        console.error(result); 
        return { error: 'Yorum beğenme sorgusu beklenen sonucu döndürmedi.' };
      }
    } catch (err) {
      console.error('Hata: ', err);
      console.error('Yorum beğenme sırasında bir hata oluştu:', err.message);
      return { error: 'Yorum beğenme sırasında bir hata oluştu: ' + err.message };
    }
  },
};

module.exports = LikeCommentModel;
