const LikeCommentModel = require('../models/like-comment-model');
const ExistModel = require('../models/exist-model');

const LikeCommentController = {
    addCommentLikeController: async function (req, res) {
        try {
            const commentId = req.body.commentId;
            const movieId = req.body.movieId;
            const userId = req.body.userId;
            const likeCommentExists = await ExistModel.checkCommentLikeExistence(commentId, userId ,movieId );
            if (likeCommentExists) {
                console.error('Yorum zaten beğenildi.');
                return res.status(400).json({ success: false, error: 'Yorum zaten beğenildi.' });
            }
            const result = await LikeCommentModel.addCommentLike({
                commentId: commentId,
                userId: userId,
                movieId: movieId,
            });
            if (result.success) {
                res.status(200).json({ success: true, message: 'Yorum beğenildi' });
            } else {
                console.error(result);
                console.error('Yorum beğenme sorgusu beklenen sonucu döndürmedi.');
                res.status(500).json({ success: false, error: 'Yorum beğenilirken bir hata oluştu.' });
            }

        } catch (error) {
            console.error('Hata Tipi: ', error.name);
            console.error('Hata Mesajı: ', error.message);
            console.error('Hata Detayları: ', error);
            return res.status(500).json({ error: 'Yorum beğenilirken bir hata oluştu: ' + error.message });
        }
    },
};

module.exports = LikeCommentController;
