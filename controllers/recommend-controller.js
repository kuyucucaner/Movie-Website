const RecommendModel = require('../models/recommend-model');

const RecommendController = {
    getMovieDetailByMovieIDController: async function (req, res) {
        try {
            const categoryId = req.params.id;
            const movie = await RecommendModel.getRecommendedMoviesByCategoryID(categoryId);
            console.log('recommended controller : ', movie);
            res.json(movie);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = RecommendController;