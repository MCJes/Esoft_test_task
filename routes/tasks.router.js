import { Router } from 'express'
import { check } from 'express-validator'
import auth from '../middlewares/auth.js'
import tasksController from '../controllers/tasksController.js'

const router = new Router()

// /api/tasks
router.post('/create',
  auth,
  check('heading', 'Укажите заголовок задачи').notEmpty(),
  check('description', 'Введите описание задачи').notEmpty(),
  check('priority', 'Укажите приоритет задачи').notEmpty(),
  check('status', 'Укажите статус задачи').notEmpty(),
  check('managerId', 'Укажите ответственного за задачу').notEmpty(),
  check('completedAt', 'Укавжите дату окончания').notEmpty(),
  tasksController.createTask)

router.post('/update',
  auth,
  check('heading', 'Укажите заголовок задачи').notEmpty(),
  check('description', 'Введите описание задачи').notEmpty(),
  check('priority', 'Укажите приоритет задачи').notEmpty(),
  check('status', 'Укажите статус задачи').notEmpty(),
  check('managerId', 'Укажите ответственного за задачу').notEmpty(),
  check('completedAt', 'Укажите дату окончания').notEmpty(),
  check('taskId', 'Укажите задачу').notEmpty(),
  tasksController.updateTask)

router.post('/updateStatus',
  auth,
  check('status', 'Укажите статус задачи').notEmpty(),
  check('taskId', 'Укажите задачу').notEmpty(),
  tasksController.updateTaskStatus)

router.delete('/remove', auth, tasksController.removeTask)

router.get('/props', auth, tasksController.getProps)

router.get('/users/:type', auth, tasksController.managersGet)

router.get('/get/:type', auth, tasksController.getTasks)

export default router