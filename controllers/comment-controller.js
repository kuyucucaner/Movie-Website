const CommentModel = require('../models/comment-model');

const CommentController = {
    getCommentsByUserIDController: async function (req, res) {
        try {
            const { userId } = req.params; 
            const comments = await CommentModel.getCommentByUserID(userId);
            console.log('Comments: ', comments);
            return res.json(comments); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = CommentController;
