import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import db from '../db/dataBase.js'
import dataBase from "../db/dataBase.js";
import utils from "../utils/utils.js";

const signUp = async (req, res) => {
  try {
    //get errors from express-validator
    const errors = validationResult(req).array()
    if(errors.length > 0) {
      return res.status(400).json({
        errors: errors,
        message: 'Ошибка'
      })
    }

    //hash password by bcrypt
    const hashedPassword = await utils.getHashedPassword(req.body.password)

    await db.insertIntoTable('users', {
      ...req.body,
      password: hashedPassword
    })

    res.status(201).json({
      errors: [],
      message: 'Пользователь создан'
    })
  } catch (e) {
    if(e.code === 'ER_DUP_ENTRY') {
      e.message = 'Такой пользователь уже существует'
    }

    res.status(500).json({
      errors: [
        {
          msg: e.message
        }
      ],
      message: 'Ошибка!'
    })
  }
}

const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body

    //get errors from express-validator
    const errors = validationResult(req).array()
    if(errors.length > 0) {
      return res.status(400).json({
        errors,
        message: 'Ошибка'
      })
    }

    //get user info from dataBase
    const user = await dataBase.selectByUserName('users', userName)

    if(!user) {
      return res.status(400).json({
        errors: [],
        message: 'Такого пользователя не существует'
      })
    }

    //comparePasswords
    const passwordMatch = await utils.isPasswordMatches(password, user.password)

    if(!passwordMatch) {
      return res.status(400).json({
        errors: [],
        message: 'Пароли не совпадают'
      })
    }

    //generate token
    const token = jwt.sign({
      user
    }, process.env.JWT_SECRET)

    //set authorization header
    res.setHeader('authorization', `Bearer ${token}`)

    res.status(200).json({
      errors: [],
      message: 'Пользователь',
      token,
      userId: user.id
    })
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: e.message
        }
      ],
      message: 'Ошибка!'
    })
  }
}

export default {
  signUp,
  signIn,
}