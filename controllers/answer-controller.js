const AnswerModel = require('../models/answer-model');

const AnswerController = {
    getAnswerByCommentIDController: async function (req, res) {
        try {
           const { commentId } = req.params; 
            const commnets = await AnswerModel.getAnswerByCommentID(commentId);
            return res.json(commnets); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = AnswerController;
