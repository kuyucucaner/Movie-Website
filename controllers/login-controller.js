const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const LoginModel = require('../models/login-model');

const LoginController = {
    loginController: async function (req, res) {
        try {
            const { userName, password } = req.body;
            console.log('Giriş İsteği:', { userName, password });
            const { success, user, message } = await LoginModel.loginUser(userName, password);
            if (!success) {
                console.error('Giriş Başarısız:', message);
                return res.status(401).json({ success: false, message });
            }
            const accessToken = jwt.sign({
                ID: user.ID, userName: user.UserName,
                email: user.Email, role: user.RoleID,
                name: user.Name, lastName: user.LastName,
            }, process.env.JWT_ACCESSECRETKEY, { expiresIn: '5m' });
            const refreshToken = jwt.sign({
                ID: user.ID, userName: user.UserName,
                email: user.Email, role: user.RoleID,
                name: user.Name, lastName: user.LastName,
            }, process.env.JWT_REFRESHSECRETKEY, { expiresIn: '10m' });
            res.cookie('token', accessToken, { httpOnly: true, secure: true });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
            res.cookie('userLoggedIn', 'true', { httpOnly: false, secure: true });
            res.cookie('userRole', user.RoleID, { httpOnly: false, secure: true });
            res.cookie('userID', user.ID, { httpOnly: false, secure: true });
            res.cookie('userName', user.UserName, { httpOnly: false, secure: true });
            res.cookie('id', user.ID, { httpOnly: false, secure: true });
            return res.status(200).json({ success: true, message: 'Başarılı Giriş!', user });
        } catch (error) {
            console.error('Giriş Hatası:', error);
            return res.status(500).json({ success: false, message: 'Sunucu Hatası' });
        }
    },
};

module.exports = LoginController;
