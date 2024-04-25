const { check , validationResult } = require('express-validator');
const RegisterModel = require('../models/register-model');
const ExistModel = require('../models/exist-model');

const emailValidation = check('email')
  .isEmail().withMessage('Geçersiz e-posta formatı.')
  .custom(async (value, { req }) => {
    const isEmailExists = await ExistModel.checkEmailExistence(value);
    if (isEmailExists) {
      throw new Error('E-posta adresi zaten kullanılıyor.');
    }
  });

const userNameValidation = check('userName')
  .custom(async (value, { req }) => {
    const isUserNameExist = await ExistModel.checkUserNameExistence(value);
    if (isUserNameExist) {
      throw new Error('Kullanıcı adı zaten kullanılıyor.');
    }
  });

const passwordValidation = check('password')
  .isLength({ min: 6 }).withMessage('Şifre en az 6 karakter uzunluğunda olmalı.');

const confirmPasswordValidation = check('confirmPassword')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Şifreler uyuşmuyor.');
    }
    return true;
  });

const validateAndRegisterUser = async (req, res, next) => {
  try {
    await Promise.all([
      emailValidation.run(req),
      userNameValidation.run(req),
      passwordValidation.run(req),
      confirmPasswordValidation.run(req)
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const user = req.body;
    console.log('Yeni Üye:', user);
    await RegisterModel.registerUser(user);
    return res.status(200).json({ success: 'Kullanıcı başarıyla kaydedildi' });
  } catch (error) {
    console.error('Kullanıcı kayıt hatası:', error);
    return res.status(500).json({ error: 'Kullanıcı kayıt Hatası!' });
  }
};

module.exports = {
  registerUserController: validateAndRegisterUser,
};
