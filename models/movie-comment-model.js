const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');


const MovieCommentModel = {
    getMovieCommentByMovieID: async function (movieId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('movieId', mssql.Int, movieId)
                .query(`
                SELECT
                Comments.ID,
                Comments.MovieID,
                Comments.GuestEmail,
                Comments.GuestName,
                Users.UserName,
                Users.Photo,
                Roles.RoleName,
                Comments.CommentText,
                Comments.Timestamp,
                Comments.IsSpoiler
                FROM Comments
                LEFT JOIN  Users ON Comments.UserID = Users.ID
                LEFT JOIN Roles ON Users.RoleID = Roles.ID          
                WHERE Comments.MovieID = @movieId`);
            if (result.recordset && result.recordset.length > 0) {
                const comments = result.recordset; 
                
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].Photo !== null && comments[i].Photo !== undefined) {
                        const base64String = base64.fromByteArray(comments[i].Photo);
                        comments[i].Photo = `data:image/jpeg;base64,${base64String}`;
                    }
                }
                console.log('comments : ', comments);
                return comments;
            } else {
                console.error('Filmin Yorumlarını Getirme sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Filmin Yorumlarını Getirme sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
}
module.exports = MovieCommentModel;