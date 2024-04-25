const ImdbSevenPlusModel = require('../models/imdb-seven-plus-model');

const IMDBSevenPlusController = {
    getIMDBSevenPlusMoviesController: async function (req, res) {
        try {
            const movie = await ImdbSevenPlusModel.getIMDBSevenPlusMovies();
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = IMDBSevenPlusController;
