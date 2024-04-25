const AddCommentAnswerModel = require('../models/add-comment-answer-model');

const AddCommentAnswerController = {
    addCommentAnswerController: async function (req, res) {
    try {
      console.log('Request Body : ' , req.body);
      const result = await AddCommentAnswerModel.addCommentAnswer({
          commentId: req.body.commentId,
          userId: req.body.userId,
          guestEmail: req.body.guestEmail,
          guestName: req.body.guestName,
          commentText: req.body.commentText,
      });
      if (result.success) {
        res.status(200).json({ success: true, message: 'Yorum başarıyla eklendi.' });
      } else {
        console.error(result);
        console.error('Yorum ekleme sorgusu beklenen sonucu döndürmedi.');
        res.status(500).json({ success: false, error: 'Yorum Eklenirken bir hata oluştu.' });
      }

    } catch (error) {
      console.error('Hata Tipi: ', error.name);
      console.error('Hata Mesajı: ', error.message);
      console.error('Hata Detayları: ', error);
      return res.status(500).json({ error: 'Yorum eklenirken bir hata oluştu: ' + error.message });
    }
  },
};

module.exports = AddCommentAnswerController;