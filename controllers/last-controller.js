const LastModel = require('../models/last-model');

const LastController = {
    getLastAddedMoviesController: async function (req, res) {
        try {
            const movie = await LastModel.getLastAddedMovies();
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = LastController;
