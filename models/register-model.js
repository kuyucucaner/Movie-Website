const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');


const RegisterModel = {
    registerUser: async function (user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const pool = await mssql.connect(dbConfig);
            const result = await pool.request()
                .input('name', mssql.NVarChar, user.name)
                .input('lastName', mssql.NVarChar, user.lastName)
                .input('userName', mssql.NVarChar, user.userName)
                .input('password', mssql.NVarChar, hashedPassword)
                .input('email', mssql.NVarChar, user.email)
                .query(`INSERT INTO Users 
                (Name, LastName, UserName, Password, Email) OUTPUT INSERTED.Id VALUES 
                (@name, @lastName, @userName, @password, @email)`);
            console.log('result:', result);
            if (result.rowsAffected && result.rowsAffected[0] === 1) {
                console.log('Kullanıcı başarıyla eklenmiştir.');
                return result;
            } else {
                console.error('Kullanıcı ekleme sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Kullanıcı ekleme sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }
    },
}

module.exports = RegisterModel;