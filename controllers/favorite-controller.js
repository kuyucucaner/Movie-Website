const FavoriteModel = require('../models/favorite-model');

const FavoriteController = {
    getFavoritedMoviesController: async function (req, res) {
        try {
            const movie = await FavoriteModel.getFavoritedMovies();
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = FavoriteController;
