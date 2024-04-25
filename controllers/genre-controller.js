const GenreModel = require('../models/genre-model');

const GenreController = {
    getGenreByCategoryIDController: async function (req, res) {
        try {
            const categoryId = req.body.categoryId; 
            const movie = await GenreModel.getGenreByCategoryID(categoryId);
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = GenreController;
