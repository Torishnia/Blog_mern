import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Невірно вказані данні пошти').isEmail(),
  body('password', 'Пароль повинен бути не менше 8 символів').isLength({ min: 8, max: 15 }),
  body('fullName', 'Вкажіть ПІБ').isLength({ min: 3 }),
  body('avatarUrl', 'Невірно вказана силка на аватар').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Невірно вказані данні пошти').isEmail(),
  body('password', 'Пароль повинен бути не менше 8 символів').isLength({ min: 8, max: 15 }),
];

export const postCreateValidation = [
  body('title', 'Введіть заголовок статті').isLength({ min: 3 }).isString(),
  body('text', 'Введіть текст статті').isLength({ min: 10 }).isString(),
  body('tags', 'Невірний формат тегів').optional().isString(),
  body('imageUrl', 'Невірний формат посилання на зображення').optional().isString(),
];
