const dbConfig = require('../dbConfig');
const mssql = require('mssql');

const UpdateModel = {
    updateUserByUserName: async function (userData) {
        const {
          name,
          lastName,
          email,
          userName,
          fileBuffer,
        } = userData;
        try {
          const pool = await mssql.connect(dbConfig);
          const result = await pool
            .request()
            .input('name', mssql.NVarChar, name)
            .input('lastName', mssql.NVarChar, lastName || null)
            .input('email', mssql.NVarChar, email || null)
            .input('userName', mssql.NVarChar, userName || null)
            .input('photo', mssql.VarBinary, fileBuffer !== null ? fileBuffer : null)
            .query(`
              UPDATE Users 
              SET 
                  Email = @email,
                  Name = @name,
                  LastName = @lastName,
                  Photo = @photo
              WHERE UserName = @userName
            `);
        
          if (result.rowsAffected && result.rowsAffected.length > 0 && result.rowsAffected[0] === 1) {
            console.log('Kullanıcı başarıyla güncellenmiştir.');
            return { success: 'Kullanıcı başarıyla güncellenmiştir.' };
          } else {
            console.error('Kullanıcı güncelleme sorgusu beklenen sonucu döndürmedi.');
            console.error(result);
            return { error: 'Kullanıcı güncelleme sorgusu beklenen sonucu döndürmedi.' };
          }
        } catch (err) {
          console.error('Hata: ', err);
          console.error('Kullanıcı güncelleme sırasında bir hata oluştu:', err.message);
          return { error: 'Kullanıcı güncelleme sırasında bir hata oluştu: ' + err.message };
        }
      },
    
    
}
module.exports = UpdateModel;