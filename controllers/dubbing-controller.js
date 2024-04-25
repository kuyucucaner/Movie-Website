const DubbingModel = require('../models/dubbing-model');

const DubbingController = {
    getDubbingedMoviesController: async function (req, res) {
        try {
            const movie = await DubbingModel.getDubbingedMovies();
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = DubbingController;
