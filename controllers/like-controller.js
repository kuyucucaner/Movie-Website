const LikeModel = require('../models/like-model');
const ExistModel = require('../models/exist-model');

const LikeController = {
    addMovieLikeController: async function (req, res) {
        try {
            const userId = req.body.userId;
            const movieId = req.body.movieId;
            const likeExists = await ExistModel.checkLikeExistence(userId, movieId);
            if (likeExists) {
                console.error('Film zaten beğenildi.');
                return res.status(400).json({ success: false, error: 'Film zaten beğenildi.' });
            }
            // Film listeye ekleniyor
            const result = await LikeModel.addMovieLike({
                userId: userId,
                movieId: movieId,
            });
            if (result.success) {
                res.status(200).json({ success: true, message: 'Film beğenildi' });
            } else {
                console.error(result);
                console.error('Film beğenme sorgusu beklenen sonucu döndürmedi.');
                res.status(500).json({ success: false, error: 'Film beğenilirken bir hata oluştu.' });
            }

        } catch (error) {
            console.error('Hata Tipi: ', error.name);
            console.error('Hata Mesajı: ', error.message);
            console.error('Hata Detayları: ', error);
            return res.status(500).json({ error: 'Film beğenilirken bir hata oluştu: ' + error.message });
        }
    },
};

module.exports = LikeController;
