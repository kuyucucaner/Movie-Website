const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const AuthService = {
  authenticateToken: (req, res, next) => {
    const accessToken = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken) {
      console.log('Yetkisiz İstek: Erişim anahtarı eksik');
      res.cookie('userLoggedIn', 'false', { httpOnly: false, secure: true });
      res.cookie('isLoggedIn', 'false', { httpOnly: false, secure: true });
      return res.status(401).redirect('/'); 
    }

    jwt.verify(accessToken, process.env.JWT_ACCESSECRETKEY, (err, decodedUser) => {
      if (err) {
        console.error('JWT Doğrulama Hatası (Erişim Anahtarı):', err);
        if (!refreshToken) {
          res.cookie('userLoggedIn', 'false', { httpOnly: false, secure: true });
          res.cookie('isLoggedIn', 'false', { httpOnly: false, secure: true });
          console.log('Yetkisiz İstek: Yenileme anahtarı eksik');
          return res.status(403).redirect('/')
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESHSECRETKEY, (err, decodedUser) => {
          if (err) {
            console.error('JWT Doğrulama Hatası (Yenileme Anahtarı):', err);
            res.cookie('userLoggedIn', 'false', { httpOnly: false, secure: true });
            res.cookie('isLoggedIn', 'false', { httpOnly: false, secure: true });
            return res.status(403).redirect('/');
          }

          const newAccessToken = jwt.sign({ userId: decodedUser.ID }, process.env.JWT_ACCESSECRETKEY, { expiresIn: '5min' });
          res.cookie('token', newAccessToken, { httpOnly: true, secure: true });
          console.log('Yeni erişim anahtarı oluşturuldu ve kullanıcıya gönderildi:', newAccessToken);
          req.user = decodedUser;
          next();
        });
      } else {
        req.user = decodedUser;
        next();
      }
    });
  },
};

module.exports = AuthService;