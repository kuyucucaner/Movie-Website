const SearchModel = require('../models/search-model');

const SearchController = {
    getSearchedMovieController: async function (req, res) {
        try {
            const { query } = req.body; 
            console.log('Request Body : ', req.body);
            const movie = await SearchModel.getSearchedMovie(query);
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = SearchController;
