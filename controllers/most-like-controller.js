const MostLikeModel = require('../models/most-like-model');

const MostLikeController = {
    getMostLikedMoviesController: async function (req, res) {
        try {
            const movie = await MostLikeModel.getMostLikedMovies();
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = MostLikeController;
