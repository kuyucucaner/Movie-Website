const nodemailer = require('nodemailer');

const MailModel = {
    sendEmail : async (from, subject, text) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        try {
            const info = await transporter.sendMail({
                from,
                to :'tahacanokuyucu@gmail.com' ,
                subject,
                text,
            });
    
            console.log('Email sent: %s', info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    },
};

module.exports = MailModel;