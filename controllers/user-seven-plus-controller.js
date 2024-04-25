const UserSevenPlusModel = require('../models/user-seven-plus-model');

const UserSevenPlusController = {
    getUserSevenPlusMoviesController: async function (req, res) {
        try {
            const movie = await UserSevenPlusModel.getUserSevenPlusMovies();
            return res.json(movie); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    },
};

module.exports = UserSevenPlusController;
