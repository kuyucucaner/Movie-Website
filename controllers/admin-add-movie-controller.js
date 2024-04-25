const AdminAddMovieModel = require('../models/admin-add-movie-model');

const AdminAddMovieController = {
    adminAddMovieController: async function (req, res) {
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
      console.log('Request Body : ' , req.body);
      const result = await AdminAddMovieModel.adminAddMovie({
          fileBuffer: req.file ? req.file.buffer : (req.body.photo ? Buffer.from(req.body.photo.split(',')[1], 'base64') : null),
          movieTrailer: req.body.movieTrailer,
          movieVideoFirst: req.body.movieVideoFirst,
          movieVideoSecond: req.body.movieVideoSecond,
          movieVideoThird: req.body.movieVideoThird,
          movieName: req.body.movieName,
          categoryId: req.body.categoryId,
          typeId: req.body.typeId,
          movieYear: req.body.movieYear,
          movieImdb: req.body.movieImdb,
          movieRate: req.body.movieRate,
          movieSummary: req.body.movieSummary,
          movieDirector: req.body.movieDirector,
          movieActorFirst: req.body.movieActorFirst,
          movieActorSecond: req.body.movieActorSecond,
          movieActorThird: req.body.movieActorThird,
          movieActorFourth: req.body.movieActorFourth,
          movieCountry: req.body.movieCountry,
          isFavorited: req.body.isFavorited,
      });
      if (result.success) {
        res.status(200).json({ success: true, message: 'Film başarıyla eklendi.' });
      } else {
        console.error(result);
        console.error('Film ekleme sorgusu beklenen sonucu döndürmedi.');
        res.status(500).json({ success: false, error: 'Film Eklenirken bir hata oluştu.' });
      }
    } catch (error) {
      console.error('Hata Tipi: ', error.name);
      console.error('Hata Mesajı: ', error.message);
      console.error('Hata Detayları: ', error);
      return res.status(500).json({ error: 'Film eklenirken bir hata oluştu: ' + error.message });
    }
  },
};

module.exports = AdminAddMovieController;