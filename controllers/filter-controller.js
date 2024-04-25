const FilterModel = require('../models/filter-model');

const FilterController = {
    getFilteredMovies: async function (req, res) {
        try {
            const filterOptions = {
                movieRating: req.body.MovieIMDB,
                minImdbRating: req.body.MinMovieIMDB,
                filmYear: req.body.MovieYear,
                filmGenre: req.body.MovieCategory,
                filmLanguage: req.body.MovieType,
            };
            const filteredMovies = await FilterModel.getFilteredMovies(filterOptions);
            res.json(filteredMovies);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = FilterController;
