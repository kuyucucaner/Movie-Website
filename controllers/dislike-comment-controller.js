const DislikeCommentModel = require('../models/dislike-comment-model');
const ExistModel = require('../models/exist-model');

const DislikeCommentController = {
    addCommentDislikeController: async function (req, res) {
        try {
            const commentId = req.body.commentId;
            const movieId = req.body.movieId;
            const userId = req.body.userId;
            const dislikeCommentExists = await ExistModel.checkCommentDislikeExistence(commentId, userId ,movieId );
            if (dislikeCommentExists) {
                console.error('Yorum zaten beğenilmedi.');
                return res.status(400).json({ success: false, error: 'Yorum zaten beğenilmedi.' });
            }
            const result = await DislikeCommentModel.addCommentDislike({
                commentId: commentId,
                userId: userId,
                movieId: movieId,
            });
            if (result.success) {
                res.status(200).json({ success: true, message: 'Yorum beğenilmedi' });
            } else {
                console.error(result);
                console.error('Yorum beğenmeme sorgusu beklenen sonucu döndürmedi.');
                res.status(500).json({ success: false, error: 'Yorum beğenilmezken bir hata oluştu.' });
            }

        } catch (error) {
            console.error('Hata Tipi: ', error.name);
            console.error('Hata Mesajı: ', error.message);
            console.error('Hata Detayları: ', error);
            return res.status(500).json({ error: 'Yorum beğenilmezken bir hata oluştu: ' + error.message });
        }
    },
};

module.exports = DislikeCommentController;
