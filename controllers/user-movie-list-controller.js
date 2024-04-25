const UserMovieListModel = require('../models/user-movie-list-model');

const UserMovieListController = {
    getUserMovieListController: async function (req, res) {
        try {
            const userId = req.body.userId;
            const movie = await UserMovieListModel.getUserMovieList(userId);
            console.log('movie : ', movie);
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = UserMovieListController;
