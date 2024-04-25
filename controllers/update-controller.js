const UpdateModel = require('../models/update-model');

const UpdateController = {
    updateUserByUserNameController: async function (req, res) {
    try {
      if (!req.file && !req.body.photo) {
        return res.status(400).json({ error: 'Profil fotoğrafı yüklenemedi. Lütfen bir dosya seçin veya mevcut bir dosya kullanın.' });
      }
      if (req.file && !req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Yalnızca resim dosyaları yükleyebilirsiniz.' });
      }
      if (req.file && req.file.size > 1000000) {
        return res.status(400).json({ error: 'Dosya boyutu 1 MB aşmamalıdır.' });
      }      
      const result = await UpdateModel.updateUserByUserName({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        fileBuffer: req.file ? req.file.buffer : (req.body.photo ? Buffer.from(req.body.photo.split(',')[1], 'base64') : null)
      });

      if (result.success) {
        res.status(200).json({ success: true, message: 'Profil başarıyla güncellendi.' });
      } else {
        console.error(result);
        console.error('Profil güncelleme sorgusu beklenen sonucu döndürmedi.');
        res.status(500).json({ success: false, error: 'Profil güncellenirken bir hata oluştu.' });
      }

    } catch (error) {
      console.error('Hata Tipi: ', error.name);
      console.error('Hata Mesajı: ', error.message);
      console.error('Hata Detayları: ', error);
      return res.status(500).json({ error: 'Profil güncellenirken bir hata oluştu: ' + error.message });
    }
  },
};

module.exports = UpdateController;