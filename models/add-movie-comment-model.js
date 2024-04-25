const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const AddMovieCommentModel = {
  addMovieComment: async function (userData) {
    const {
      movieId,
      userId,
      guestEmail,
      guestName,
      commentText,
      spoiler,
    } = userData; 
    try {
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
      const result = await request
        .input('movieId', mssql.Int, movieId)
        .input('userId', mssql.Int, userId || null)
        .input('guestEmail', mssql.NVarChar, guestEmail || null)
        .input('guestName', mssql.NVarChar, guestName || null)
        .input('commentText', mssql.NVarChar, commentText )
        .input('isSpoiler', mssql.NVarChar, spoiler )
        .query(`
          INSERT INTO Comments (MovieID, UserID , GuestEmail , GuestName , CommentText , IsSpoiler)
          VALUES (@movieId , @userId , @guestEmail , @guestName , @commentText , @isSpoiler)
        `);
      if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
        console.log('Yorum başarıyla eklenmiştir.');
        return { success: 'Yorum başarıyla eklenmiştir.' };
      } else {
        console.error('Yorum eklenme sorgusu beklenen sonucu döndürmedi.');
        console.error(result); 
        return { error: 'Yorum eklenme sorgusu beklenen sonucu döndürmedi.' };
      }
    } catch (err) {
      console.error('Hata: ', err);
      console.error('Yorum eklenme sırasında bir hata oluştu:', err.message);
      return { error: 'Yorum eklenme sırasında bir hata oluştu: ' + err.message };
    }
  },
};

module.exports = AddMovieCommentModel;
