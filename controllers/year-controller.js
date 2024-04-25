const YearModel = require('../models/year-model');

const YearController = {
    getMoviesByYearRangeController: async function (req, res) {
        try {
            const startYear = req.body.startYear;
            const endYear = req.body.endYear;
            const movies = await YearModel.getMoviesByYearRange(endYear , startYear);
            return res.json(movies); 
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message }); 
        }
    }
};

module.exports = YearController;
