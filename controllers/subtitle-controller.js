const SubtitleModel = require('../models/subtitle-model');

const SubtitleController = {
    getSubtitledMoviesController: async function (req, res) {
        try {
            const movie = await SubtitleModel.getSubtitledMovies();
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = SubtitleController;
