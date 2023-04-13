import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Невірно вказані данні пошти').isEmail(),
  body('password', 'Пароль повинен бути не менше 8 символів').isLength({ min: 8, max: 15 }),
  body('fullName', 'Вкажіть ПІБ').isLength({ min: 3 }),
  body('avatarUrl', 'Невірно вказана силка на аватар').optional().isURL(),
]
