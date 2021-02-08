import { Router } from 'express'
import { check } from 'express-validator'
import userController from '../controllers/userController.js'
import auth from "../middlewares/auth.js"

const router = new Router()

router.post('/signUp',
  check('name', 'Укажите ваше имя').notEmpty(),
  check('surname', 'Укажите вашу фамилию').notEmpty(),
  check('middleName', 'Укажите ваше отчество').notEmpty(),
  check('userName', 'Укажите имя пользователя').notEmpty(),
  check('password', 'Укажите пароль').notEmpty(),
  userController.signUp)

router.post('/signIn',
  check('userName', 'Укажите имя пользователя').notEmpty(),
  check('password', 'Укажите пароль').notEmpty(),
  userController.signIn)

router.post('/verify', userController.verifyToken)

router.post('/addLeader', auth, userController.addLeader)

export default router
