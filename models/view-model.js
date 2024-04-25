const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const ViewModel = {
    increaseView: async function (movieId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('movieId', mssql.Int, movieId)
                .query(`
                UPDATE Movies
                SET MovieViews = MovieViews + 1
                WHERE ID = @movieId
            `);
            if (result.recordset && result.recordset.length > 0) {
                const comments = result.recordset; 
                return comments;
          } else {
              console.error('Yorum getirme sorgusu beklenen sonucu döndürmedi.');
              return { error: 'Yorum getirme sorgusu beklenen sonucu döndürmedi.' };
          }
          
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }

    },
}
module.exports = ViewModel;