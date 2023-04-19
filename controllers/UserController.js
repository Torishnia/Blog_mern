import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

export const register = async (req, res, next) => {
  try {
    const { email, fullName, avatarUrl, password } = req.body;

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      res.status(200).json({ message: `User with '${email}' email already exist` });
      return next();
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const dataForSave = new UserModel({
      email,
      fullName,
      passwordHash: hashPassword,
      avatarUrl,
    })

    const user = await dataForSave.save();

    const token = jwt.sign(
      { _id: user._id }, 
      'secret123',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося зареєструватися',
    })
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Користувач не знайден',
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Невірно вказаний пароль або логін',
      })
    }

    const token = jwt.sign({
      _id: user._id,
    }, 
    'secret123',
    {
      expiresIn: '30d',
    }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося авторизуватися',
    })
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Користувач не знайден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Немає доступу',
    })
  }
};
