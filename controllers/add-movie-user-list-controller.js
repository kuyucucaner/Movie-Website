const AddMovieUserListModel = require('../models/add-movie-user-list-model');
const ExistModel = require('../models/exist-model');

const AddMovieUserListController = {
    addMovieUserListController: async function (req, res) {
        try {
            const userId = req.body.userId;
            const movieId = req.body.movieId;
            const movieExists = await ExistModel.checkListMovieExistence(userId, movieId);
            if (movieExists) {
                console.error('Film zaten listenizde var.');
                return res.status(400).json({ success: false, error: 'Film zaten listenizde var.' });
            }
            const result = await AddMovieUserListModel.addMovieUserList({
                userId: userId,
                movieId: movieId,
            });
            if (result.success) {
                res.status(200).json({ success: true, message: 'Film listeye başarıyla eklendi.' });
            } else {
                console.error(result);
                console.error('Film listeye ekleme sorgusu beklenen sonucu döndürmedi.');
                res.status(500).json({ success: false, error: 'Film listeye Eklenirken bir hata oluştu.' });
            }
        } catch (error) {
            console.error('Hata Tipi: ', error.name);
            console.error('Hata Mesajı: ', error.message);
            console.error('Hata Detayları: ', error);
            return res.status(500).json({ error: 'Film listeye eklenirken bir hata oluştu: ' + error.message });
        }
    },
};

module.exports = AddMovieUserListController;
