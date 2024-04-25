const dbConfig = require('../dbConfig');
const mssql = require('mssql');


const CommentLikeModel = {
    getMovieCommentLikes: async function (commentId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('commentId', mssql.Int, commentId)
                .query(`
                SELECT 
                COUNT(DISTINCT UserCommentLikes.UserID) AS LikeCount,
                COUNT(DISTINCT UserCommentDislikes.UserID) AS DislikeCount
            FROM 
                Comments
            LEFT JOIN 
                UserCommentLikes ON Comments.ID = UserCommentLikes.CommentID
            LEFT JOIN 
                UserCommentDislikes ON Comments.ID = UserCommentDislikes.CommentID
            WHERE 
                Comments.ID = @commentId
            GROUP BY 
                Comments.ID
            `);
            if (result.recordset && result.recordset.length > 0) {
                const comments = result.recordset; 
                return comments;
            } else {
                console.error('Yorum Likelerını Getirme sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Yorum Likelerını Getirme sorgusu beklenen sonucu döndürmedi.' };
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
}
module.exports = CommentLikeModel;