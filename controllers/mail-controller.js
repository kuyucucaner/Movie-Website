const MailModel = require('../models/mail-model');

const MailController = {
    sendMail: async (req, res) => {
        const { name, email, message } = req.body;
        try {
            const from = email;
            const subject = 'Site Hakkında !';
            const text = `
            Ad: ${name}
            Email: ${email}
            İstek: ${message}
            `;
            await MailModel.sendEmail(from, subject, text);
            res.status(200).json({ success: true, message: 'E-posta başarıyla gönderildi.' });
        } catch (error) {
            console.error('E-posta gönderme hatası:', error);
            res.status(500).json({ success: false, message: 'E-posta gönderilirken bir hata oluştu.' });
        }
    }
};

module.exports = MailController;
