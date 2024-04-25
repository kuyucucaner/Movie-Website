const MovieCommentModel = require('../models/movie-comment-model');
const MovieDetailModel = require('../models/movie-detail-model');
const RecommendModel = require('../models/recommend-model');
const AnswerModel = require('../models/answer-model');
const CommentLikeModel = require('../models/comment-like-model');
const ViewModel = require('../models/view-model');

let lastViewIncreaseTime = 0;

const MovieDetailController = {
  getMovieDetailByMovieIDController: async function (req, res) {
      try {
          const id = req.params.id;
          const currentTime = Date.now();
          const movie = await MovieDetailModel.getMovieDetailByMovieID(id);
          if (movie) {
              const categoryId = movie.CategoryID;
              const movieId = movie.ID;
              const timeDifference = currentTime - lastViewIncreaseTime;
              if (timeDifference >= 20000) {
                  await ViewModel.increaseView(movieId);
                  lastViewIncreaseTime = currentTime;
              }
              const recommend = await RecommendModel.getRecommendedMoviesByCategoryID(categoryId);
              const recommended = recommend.filter(item => item.ID !== parseInt(id) && item.ID !== movie.ID);
              const comments = await MovieCommentModel.getMovieCommentByMovieID(movieId);
              
              // Fetch answers for each comment
              const answersPromises = comments.length > 0 ? 
                comments.map(async comment => {
                  const answers = await AnswerModel.getAnswerByCommentID(comment.ID);
                  return { commentID: comment.ID, answers: answers };
                }) : [];

              // Wait for all answers to be fetched
              const answersData = await Promise.all(answersPromises);
              const answers = {};
              answersData.forEach((item) => {
                  answers[item.commentID] = item.answers;
      

              });

              // Fetch number of likes and dislikes for each comment
              const likesAndDislikesPromises = comments.length > 0 ? 
                comments.map(async comment => {
                  const numberOfLikes = await CommentLikeModel.getMovieCommentLikes(comment.ID);
                  return { commentID: comment.ID, likes: numberOfLikes };
                }) : [];

              // Wait for all likes and dislikes to be fetched
              const likesAndDislikesData = await Promise.all(likesAndDislikesPromises);
              const likesAndDislikes = {};
              likesAndDislikesData.forEach((item) => {
                  likesAndDislikes[item.commentID] = item.likes;
              });
              console.log('ANSWERS :  ', answers);

              const numberOfComments = comments.length;
              res.render('movie-detail', {
                  title: 'Caner Film',
                  movie: movie,
                  recommend: recommended,
                  answers: answers,
                  likesAndDislikes: likesAndDislikes,
                  comments: comments,
                  numberOfComments: numberOfComments,
                  userID: req.cookies.userID,
                  userName: req.cookies.userName
              });
          } else {
              console.log('Film bulunamadı');
              return res.status(404).json({ error: 'Movies not found' });
          }
      } catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
  },
};

module.exports = MovieDetailController;
