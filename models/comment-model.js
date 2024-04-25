const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const CommentModel = {
    getCommentByUserID: async function (userId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('userId', mssql.Int, userId)
                .query(`
                SELECT Movies.MovieName , Users.UserName , Users.Photo , Comments.CommentText ,
                Comments.Timestamp , Comments.CommentLike, Comments.CommentDislike, Comments.ID,
                Roles.RoleName
                FROM Comments
                INNER JOIN Movies ON Comments.MovieID = Movies.ID
                INNER JOIN Users ON Comments.UserID = Users.ID
                INNER JOIN Roles ON Users.RoleID = Roles.ID
                WHERE Comments.UserID = @userId
            `);
            if (result.recordset && result.recordset.length > 0) {
                const comments = result.recordset; 
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].Photo !== null && comments[i].Photo !== undefined) {
                        const base64String = base64.fromByteArray(comments[i].Photo);
                        comments[i].Photo = `data:image/jpeg;base64,${base64String}`;
                    }
                }
                return comments;
          } else {
              console.error('Yorum getirme sorgusu beklenen sonucu döndürmedi.');
              return { error: 'Yorum getirme sorgusu beklenen sonucu döndürmedi.' };
          }
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }

    },
}
module.exports = CommentModel;