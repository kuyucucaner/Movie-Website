const connect = require('../dbConfig');
const mssql = require('mssql');

const Exist = {
    checkEmailExistence: async function (email) {
        try {
            const pool = await mssql.connect(connect);
            const queryResult = await pool
                .request()
                .input('email', mssql.NVarChar, email)
                .query('SELECT COUNT(*) AS count FROM Users WHERE Email = @email');
    
            const userCount = queryResult.recordset[0].count;
            return userCount > 0;
        } catch (error) {
            console.error('E-posta varlığı kontrolü sırasında bir hata oluştu:', error);
            throw error; 

        }
    },  
    checkUserNameExistence: async function (username) {
        try {
            const pool = await mssql.connect(connect);
            const queryResult = await pool
                .request()
                .input('userName', mssql.NVarChar, username)
                .query('SELECT COUNT(*) AS count FROM Users WHERE UserName = @userName');
            const userCount = queryResult.recordset[0].count;
            return userCount > 0;
        } catch (error) {
            console.error('Username varlığı kontrolü sırasında bir hata oluştu:', error);
            throw error; 
        }

    },  
    checkListMovieExistence: async function (userId, movieId) {
        try {
            const pool = await mssql.connect(connect);
            const queryResult = await pool
                .request()
                .input('userId', mssql.Int, userId)
                .input('movieId', mssql.Int, movieId)
                .query('SELECT COUNT(*) AS count FROM UserMovieLists WHERE UserID = @userId AND MovieID = @movieId');
            const userCount = queryResult.recordset[0].count;
            return userCount > 0;
        } catch (error) {
            console.error('Movie List varlığı kontrolü sırasında bir hata oluştu:', error);
            throw error; // Hata durumunda istisna fırlatılıyor
        }
    },  
    checkLikeExistence: async function (userId, movieId) {
        try {
            const pool = await mssql.connect(connect);
            const queryResult = await pool
                .request()
                .input('userId', mssql.Int, userId)
                .input('movieId', mssql.Int, movieId)
                .query('SELECT COUNT(*) AS count FROM UserLikeLists WHERE UserID = @userId AND MovieID = @movieId');
            const userCount = queryResult.recordset[0].count;
            return userCount > 0;
        } catch (error) {
            console.error('Like varlığı kontrolü sırasında bir hata oluştu:', error);
            throw error; // Hata durumunda istisna fırlatılıyor
        }
    },   
     checkDislikeExistence: async function (userId, movieId) {
        try {
            const pool = await mssql.connect(connect);
            const queryResult = await pool
                .request()
                .input('userId', mssql.Int, userId)
                .input('movieId', mssql.Int, movieId)
                .query('SELECT COUNT(*) AS count FROM UserDislikeLists WHERE UserID = @userId AND MovieID = @movieId');
            const userCount = queryResult.recordset[0].count;
            return userCount > 0;
        } catch (error) {
            console.error('Dislike varlığı kontrolü sırasında bir hata oluştu:', error);
            throw error; // Hata durumunda istisna fırlatılıyor
        }
    },  
    checkCommentLikeExistence: async function (commentId, userId, movieId) {
        try {
            const pool = await mssql.connect(connect);
            const queryResult = await pool
                .request()
                .input('commentId', mssql.Int, commentId)
                .input('userId', mssql.Int, userId)
                .input('movieId', mssql.Int, movieId)
                .query('SELECT COUNT(*) AS count FROM UserCommentLikes WHERE CommentID = @commentId AND MovieID = @movieId AND UserID = @userId');
            const userCount = queryResult.recordset[0].count;
            return userCount > 0;
        } catch (error) {
            console.error('Like Comment varlığı kontrolü sırasında bir hata oluştu:', error);
            throw error; // Hata durumunda istisna fırlatılıyor
        }
    }, 
    checkCommentDislikeExistence: async function (commentId, userId, movieId) {
        try {
            const pool = await mssql.connect(connect);
            const queryResult = await pool
                .request()
                .input('commentId', mssql.Int, commentId)
                .input('userId', mssql.Int, userId)
                .input('movieId', mssql.Int, movieId)
                .query('SELECT COUNT(*) AS count FROM UserCommentDislikes WHERE CommentID = @commentId AND MovieID = @movieId AND UserID = @userId');
            const userCount = queryResult.recordset[0].count;
            return userCount > 0;
        } catch (error) {
            console.error('Like Comment varlığı kontrolü sırasında bir hata oluştu:', error);
            throw error; // Hata durumunda istisna fırlatılıyor
        }
    }, 
};

module.exports = Exist;