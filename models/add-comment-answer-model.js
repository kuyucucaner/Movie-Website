const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const AddCommentAnswerModel = {
  addCommentAnswer: async function (userData) {
    const {
      commentId,
      userId,
      guestEmail,
      guestName,
      commentText,
    } = userData; 
    try {
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
      const result = await request
        .input('commentId', mssql.Int, commentId)
        .input('userId', mssql.Int, userId || null)
        .input('guestEmail', mssql.NVarChar, guestEmail || null)
        .input('guestName', mssql.NVarChar, guestName || null)
        .input('commentText', mssql.NVarChar, commentText )
        .query(`
          INSERT INTO CommentAnswers (CommentID, UserID , GuestEmail , GuestName , CommentText)
          VALUES (@commentId , @userId , @guestEmail , @guestName , @commentText)
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

module.exports = AddCommentAnswerModel;
