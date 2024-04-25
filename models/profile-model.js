const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const ProfileModel = {
    getUserByUserName: async function (userName) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('userName', mssql.NVarChar, userName)
                .query(`
                SELECT *
                FROM Users
                WHERE UserName = @userName
            `);
            if (result.recordset && result.recordset.length > 0) {
              const user = result.recordset[0];
              if (user.Photo !== null && user.Photo !== undefined) {
                  const base64String = base64.fromByteArray(user.Photo);
                  user.Photo = `data:image/jpeg;base64,${base64String}`;
              }
              return user;
          } else {
              console.error('Kullanıcı profil sorgusu beklenen sonucu döndürmedi.');
              return { error: 'Kullanıcı profil sorgusu beklenen sonucu döndürmedi.' };
          }
          
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }

    },
}
module.exports = ProfileModel;