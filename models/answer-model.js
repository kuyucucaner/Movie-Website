const dbConfig = require('../dbConfig');
const mssql = require('mssql');
const base64 = require('base64-js');

const AnswerModel = {
    getAnswerByCommentID: async function (commentId) {
        try {
            const pool = await mssql.connect(dbConfig);
            const result = await pool
                .request()
                .input('commentId', mssql.Int, commentId)
                .query(`
                SELECT
                CommentAnswers.ID,
				CommentAnswers.CommentID,
                CommentAnswers.GuestEmail,
                CommentAnswers.GuestName,
                Users.UserName,
                Users.Photo,
                Roles.RoleName,
                CommentAnswers.CommentText,
                CommentAnswers.Timestamp
                FROM CommentAnswers
                LEFT JOIN  Users ON CommentAnswers.UserID = Users.ID
                LEFT JOIN Roles ON Users.RoleID = Roles.ID          
                WHERE CommentAnswers.CommentID = @commentId
            `);
            if (result.recordset && result.recordset.length > 0) {
                const answers = result.recordset;
                for (let i = 0; i < answers.length; i++) {
                    if (answers[i].Photo !== null && answers[i].Photo !== undefined) {
                        const base64String = base64.fromByteArray(answers[i].Photo);
                        answers[i].Photo = `data:image/jpeg;base64,${base64String}`;
                    }
                }
                return answers;
            } else {
                console.error('Comment Answer sorgusu beklenen sonucu döndürmedi.');
                return { error: 'Comment Answer sorgusu beklenen sonucu döndürmedi.' };
            }
          
        } catch (err) {
            console.error('Error : ', err);
            return { error: err.message }; 
        }

    },
}
module.exports = AnswerModel;
