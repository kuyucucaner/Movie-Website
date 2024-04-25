var express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const RegisterController = require('../controllers/register-controller');
const LoginController = require('../controllers/login-controller');
const ProfileModel = require('../models/profile-model');
const AuthService = require('../auth/auth-service');
const CommentController = require('../controllers/comment-controller');
const CommentModel = require('../models/comment-model');
const UpdateController = require('../controllers/update-controller');
const MailController = require('../controllers/mail-controller');
const FavoriteController = require('../controllers/favorite-controller');
const LastController = require('../controllers/last-controller');
const FilterController = require('../controllers/filter-controller');
const GenreController = require('../controllers/genre-controller');
const YearController = require('../controllers/year-controller');
const DubbingController = require('../controllers/dubbing-controller');
const SubtitleController = require('../controllers/subtitle-controller');
const MostViewController = require('../controllers/most-view-controller');
const MostLikeController = require('../controllers/most-like-controller');
const IMDBSevenPlusController = require('../controllers/imdb-seven-plus-controller');
const UserSevenPlusController = require('../controllers/user-seven-plus-controller');
const SearchController = require('../controllers/search-controller');
const MovieDetailController = require('../controllers/movie-detail-controller');
const MovieCommentController = require('../controllers/movie-comment-controller');
const AdminAddMovieController = require('../controllers/admin-add-movie-controller');
const AddMovieCommentController = require('../controllers/add-movie-comment-controller');
const UserMovieListController = require('../controllers/user-movie-list-controller');
const AddMovieUserListController = require('../controllers/add-movie-user-list-controller');
const LikeController = require('../controllers/like-controller');
const DislikeController = require('../controllers/dislike-controller');
const LikeCommentController = require('../controllers/like-comment-controller');
const DislikeCommentController = require('../controllers/dislike-comment-controller');
const UserMovieListModel = require('../models/user-movie-list-model');
const CommentLikeModel = require('../models/comment-like-model');
const AddCommentAnswerController = require('../controllers/add-comment-answer-controller');
const AnswerController = require('../controllers/answer-controller');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Caner Film' });
});

//REGİSTER
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Caner Film' });
});
router.post('/register-user' , RegisterController.registerUserController);

//LOGİN
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Caner Film' });
});

router.post('/login-user' , LoginController.loginController);
// PROFİLE 
router.get('/profile' ,AuthService.authenticateToken ,async function(req , res , next) {
  const userName = req.user.userName;
  const profile = await ProfileModel.getUserByUserName(userName);
  const id = req.user.ID;
  const movies = await UserMovieListModel.getUserMovieList(id);
  const comments = await CommentModel.getCommentByUserID(id); 
  const likesAndDislikesPromises = comments.length > 0 ? // Check if comments is not empty
  comments.map(async comment => {
    const numberOfLikes = await CommentLikeModel.getMovieCommentLikes(comment.ID);
    return { commentID: comment.ID, likes: numberOfLikes };
  }) : [];
  await Promise.all(likesAndDislikesPromises).then(likesAndDislikesData => {
      likesAndDislikes = {};
      likesAndDislikesData.forEach((item) => {
        likesAndDislikes[item.commentID] = item.likes;
      });
      console.log('likes and dislikes: ', JSON.stringify(likesAndDislikes, null, 2));
    });
  res.render('profile', { title: 'Caner Haber' , person : profile , comment : comments , movies: movies, likesAndDislikes: likesAndDislikes,})
});
//UPDATE 
router.get('/update' ,AuthService.authenticateToken,async function(req , res , next) {
  const userName = req.user.userName;
  const profile = await ProfileModel.getUserByUserName(userName);
  res.render('update', { title: 'Caner Haber' , person : profile})
});

router.post('/profile-update', upload.single('photo'), UpdateController.updateUserByUserNameController);
// ADD MOVİE 
router.get('/admin-add-movie' ,AuthService.authenticateToken ,async function(req , res , next) {
  res.render('admin-add-movie', { title: 'Caner Haber' })
});

router.post('/add-movie', upload.single('photo'), AdminAddMovieController.adminAddMovieController);
//COMMENTS
router.get('/comments/:userId', CommentController.getCommentsByUserIDController);

router.post('/add-comment' , AddMovieCommentController.addMovieCommentController);

router.post('/add-comment-answer' , AddCommentAnswerController.addCommentAnswerController);

router.get('/comment-answers/:commentId', AnswerController.getAnswerByCommentIDController);
//CONTACT
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Caner Film' });
});
router.post('/send-mail' , MailController.sendMail);
//FAVORİTED MOVİES 
router.get('/favorited-movies', FavoriteController.getFavoritedMoviesController);

//LAST ADDED MOVİES
router.get('/last-added', LastController.getLastAddedMoviesController);
// FİLTER 
router.post('/filter', FilterController.getFilteredMovies);

router.get('/filtered-movies', function(req, res, next) {
  res.render('filtered-movies', { title: 'Caner Film' });
});
//DUBBİNG 
router.get('/dubbinged-movies' , DubbingController.getDubbingedMoviesController);

router.get('/dubbing-movies', function(req, res, next) {
  res.render('dubbing-movies', { title: 'Caner Film' });
});
//SUBTİTLE
router.get('/subtitled-movies' , SubtitleController.getSubtitledMoviesController);

router.get('/subtitle-movies' , function (req , res , next){
  res.render('subtitle-movies' ,{title : 'Caner Film'})
});
//MOST LİKE 
router.get('/most-liked-movies', MostLikeController.getMostLikedMoviesController);

router.get('/most-like-movies' , function(req,res,next) {
  res.render('most-like-movies', {title : 'Caner Film'})
});

//MOST VİEW
router.get('/most-viewed-movies', MostViewController.getMostViewedMoviesController);

router.get('/most-view-movies' , function(req,res,next) {
  res.render('most-view-movies', {title : 'Caner Film'})
});
//USER 7+
router.get('/user-seven-plused-movies',UserSevenPlusController.getUserSevenPlusMoviesController);

router.get('/user-seven-plus-movies' , function(req,res,next) {
  res.render('user-seven-plus-movies', {title : 'Caner Film'})
});
// USER LİST 
router.post('/user-movie-list', UserMovieListController.getUserMovieListController);

//ADD MOVİE TO USER LİST 
router.post('/add-user-movie-list', AddMovieUserListController.addMovieUserListController);
//LİKE 
router.post('/movie-like', LikeController.addMovieLikeController);
//LİKE COMMENT 
router.post('/movie-comment-like' , LikeCommentController.addCommentLikeController);
//DİSLİKE 
router.post('/movie-dislike' , DislikeController.addMovieDislikeController);
//LİKE DİSLİKE
router.post('/movie-comment-dislike', DislikeCommentController.addCommentDislikeController);
//IMDB 7+
router.get('/imdb-seven-plused-movies', IMDBSevenPlusController.getIMDBSevenPlusMoviesController);

router.get('/imdb-seven-plus-movies' , function(req,res,next) {
  res.render('imdb-seven-plus-movies', {title : 'Caner Film'})
});
//GENRE 
router.post('/genre' , GenreController.getGenreByCategoryIDController);

router.get('/genred-movies', function(req, res, next) {
  res.render('genred-movies', { title: 'Caner Film' });
});

//YEAR 
router.post('/year' , YearController.getMoviesByYearRangeController);

router.get('/yeared-movies', function(req, res, next) {
  res.render('yeared-movies', { title: 'Caner Film' });
});
//SEARCH 
router.post('/search-movie', SearchController.getSearchedMovieController);

router.get('/searched-movies', function(req, res, next) {
  res.render('searched-movies', { title: 'Caner Film' });
});
//MOVİE DETAİL 
router.get('/movie-detail/:id' , MovieDetailController.getMovieDetailByMovieIDController);
// MOVİE COMMENT 
router.get('/movie-comment/:movieId' , MovieCommentController.getMovieCommentByMovieIDController);
//LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.clearCookie('id');
  res.clearCookie('userID');
  res.clearCookie('userLoggedIn');
  res.clearCookie('userRole');
  res.clearCookie('isLoggedIn');
  res.redirect('/'); // Çıkış yapıldıktan sonra anasayfaya yönlendir
});

module.exports = router;
