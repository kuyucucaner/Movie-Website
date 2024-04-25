const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');

const LoginModel = {
    loginUser: async function (userName, password) {
        try {
            const pool = await mssql.connect(dbConfig);
            if (!pool) {
                console.error('Veritabanına bağlanılamadı');
                return { success: false, message: 'Veritabanına bağlanılamadı' };
            }
            const request = pool.request();
            request.input('userName', mssql.NVarChar, userName);
            const result = await request.query('SELECT * FROM Users WHERE UserName = @userName');

            if (result.recordset.length === 0) {
                console.log('Geçersiz Kullanıcı Adı:', userName);
                return { success: false, message: 'Geçersiz Kullanıcı Adı' };
            }
            const user = result.recordset[0];
            if (!user) {
                console.log('Kullanıcı bulunamadı:', userName);
                return { success: false, message: 'Kullanıcı bulunamadı' };
            }
            if (!bcrypt.compareSync(password, user.Password)) {
                console.log('Geçersiz Şifre');
                return { success: false, message: 'Geçersiz Şifre' };
            }

            return { success: true, user: user };
        } catch (err) {
            console.error('Hata:', err);
            return { success: false, message: err.message };
        }
    },
};

module.exports = LoginModel;
