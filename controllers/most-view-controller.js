const MostViewModel = require('../models/most-view-model');

const MostViewController = {
    getMostViewedMoviesController: async function (req, res) {
        try {
            const movie = await MostViewModel.getMostViewedMovies();
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = MostViewController;
