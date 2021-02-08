import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import db from '../db/dataBase.js'
import dataBase from "../db/dataBase.js"
import utils from "../utils/utils.js"

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
        { msg: e.message }
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
    const requestedUser = await dataBase.selectBy('users', {
      userName
    })

    const user = utils.transformResult(requestedUser)

    if(!user) {
      return res.status(400).json({
        errors: [
          {msg: 'Такого пользователя не существует'}
        ],
        message: 'Ошибка!'
      })
    }

    //compare Passwords
    const passwordMatch = await utils.isPasswordMatches(password, user.password)

    if(!passwordMatch) {
      return res.status(400).json({
        errors: [
          {msg: 'Пароли не совпадают'}
        ],
        message: 'Ошибка!'
      })
    }

    //generate token
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.status(200).json({
      errors: [],
      message: 'Пользователь',
      token,
      user: {
        login: user.userName,
        name: user.name,
        surname: user.surname,
        middleName: user.middleName,
      }
    })
  } catch (e) {
    res.status(500).json({
      errors: [
        { msg: e.message }
      ],
      message: 'Ошибка!'
    })
  }
}

const verifyToken = (req, res) => {
  try {
    const { token } = req.body

    if(!token) {
      return res.status(400).json({
        errors: [
          { msg: 'Нет токена' }
        ],
        message: 'Ошибка!'
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({
      errors: [
        {}
      ],
      decodedToken
    })
  } catch (e) {
    res.status(500).json({
      errors: [
        { msg: e.message }
      ],
      message: 'Ошибка!'
    })
  }
}

const addLeader = async (req, res) => {
  try {
    const { manager } = req.body
    if(!manager) {
      res.status(500).json({
        errors: [
          { msg: 'Пользователь не найден' }
        ],
        message: 'Ошибка!'
      })
    }

    await db.updateTable('users', {
      leaderId: req.user.id
    }, manager)

    res.status(201).json({
      errors: [],
      message: 'Руководитель добавлен'
    })
  } catch (e) {
    res.status(500).json({
      errors: [
        { msg: e.message }
      ],
      message: 'Ошибка!'
    })
  }
}

export default {
  signUp,
  signIn,
  verifyToken,
  addLeader
}