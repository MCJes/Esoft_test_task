import { Router } from 'express'
import { check } from 'express-validator'
import userController from '../controllers/userController.js'
import auth from "../middlewares/auth.js"

const router = new Router()

router.post('/signUp',
  check('userName', 'Имя пользователя не может быть пустым').notEmpty(),
  check('surname', 'Укажите вашу фамилию').notEmpty(),
  check('name', 'Укажите ваше имя').notEmpty(),
  check('password', 'Пароль не может быть пустым').notEmpty(),
  userController.signUp)

router.post('/signIn',
  check('userName', 'Имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Пароль не может быть пустым').notEmpty(),
  userController.signIn)

router.get('/', auth, (req, res) => {
  console.log(req.user)
  res.json(req.user)
})

export default router
