const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const AddMovieUserListModel = {
  addMovieUserList: async function (data) {
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
        .query(`
          INSERT INTO UserMovieLists (UserID,MovieID)
          VALUES ( @userId ,@movieId)
        `);
      if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
        console.log('Film Listeye başarıyla eklenmiştir.');
        return { success: 'Film Listeye başarıyla eklenmiştir.' };
      } else {
        console.error('Film Listeye eklenme sorgusu beklenen sonucu döndürmedi.');
        console.error(result); 
        return { error: 'Film Listeye eklenme sorgusu beklenen sonucu döndürmedi.' };
      }
    } catch (err) {
      console.error('Hata: ', err);
      console.error('Film Listeye eklenme sırasında bir hata oluştu:', err.message);
      return { error: 'Film Listeye eklenme sırasında bir hata oluştu: ' + err.message };
    }
  },
};

module.exports = AddMovieUserListModel;
