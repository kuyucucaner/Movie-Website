const MovieCommentModel = require('../models/movie-comment-model');

const MovieCommentController = {
    getMovieCommentByMovieIDController: async function (req, res) {
        try {
            //MOVİEDETAİLSCONTROLLER DA KULLANDIM
            const movieId = req.params.movieId;
            console.log('Params , ', req.params);
            const movie = await MovieCommentModel.getMovieCommentByMovieID(movieId);
            console.log('Comment Movie Controller : ', movie);
            res.json(movie);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = MovieCommentController;