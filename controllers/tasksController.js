import { validationResult } from 'express-validator'
import moment from 'moment-timezone'
import db from '../db/dataBase.js'
import utils from '../utils/utils.js'

const createTask = async (req, res) => {
  try {
    //get errors from express-validator
    const errors = validationResult(req).array()
    if(errors.length > 0) {
      return res.status(400).json({
        errors,
        message: 'Ошибка!'
      })
    }

    const { heading, description, priority, status, managerId, completedAt } = req.body
    console.log(completedAt)

    await db.insertIntoTable('tasks', {
      heading,
      description,
      priority,
      status,
      creatorId: req.user.id,
      managerId,
      completedAt: moment(Number(completedAt)).format('YY.MM.DD, HH:mm:ss')
    })

    res.status(201).json({
      errors: [],
      message: 'Задача создана!'
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

const updateTask = async (req, res) => {
  try {
    //get errors from express-validator
    const errors = validationResult(req).array()
    if(errors.length > 0) {
      return res.status(400).json({
        errors,
        message: 'Ошибка!'
      })
    }

    const { heading, description, priority, status, managerId, completedAt, taskId } = req.body

    const creatorId = await db.selectBy('tasks', {
      id: taskId
    })

    if(creatorId !== req.user.id) {
      res.status(403).json({
        errors: [
          { msg: 'У вас нет прав редактировать данную задачу' }
        ],
        message: 'Ошибка'
      })
    }

    await db.updateTable('tasks', {
      heading,
      description,
      priority,
      status,
      creatorId,
      managerId,
      completedAt
    }, taskId)

    res.status(200).json({
      errors: [],
      message: 'Задача обновлена!'
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

const updateTaskStatus = async (req, res) => {
  try {
    //get errors from express-validator
    const errors = validationResult(req).array()
    if(errors.length > 0) {
      return res.status(400).json({
        errors,
        message: 'Ошибка!'
      })
    }

    const { taskId, status } = req.body

    const manager = await db.selectBy('tasks', {
      id: taskId
    }, ['managerId'])
    const managerId = manager[0].managerId

    if(managerId !== req.user.id) {
      res.status(403).json({
        errors: [
          { msg: 'У вас нет прав редактировать данную задачу' }
        ],
        message: 'Ошибка'
      })
    }

    await db.updateTable('tasks', {
      status
    }, taskId)

    res.status(200).json({
      errors: [],
      message: 'Статус обновлен!'
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

const removeTask = async (req, res) => {
  try {
    const { taskId } = req.body

    const creatorId = await db.selectBy('tasks', {
      id: taskId
    })

    if(creatorId !== req.user.id) {
      res.status(403).json({
        errors: [
          { msg: 'У вас нет прав редактировать данную задачу' }
        ],
        message: 'Ошибка'
      })
    }

    await db.removeBy('tasks', {
      taskId
    })

    res.status(200).json({
      errors: [],
      message: 'Задача удалена!'
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

const getManagedTasks = async (req, res) => {
  try {
    const rawTasks = await db.selectBy('tasks', {
      managerId: req.user.id
    })

    if(!rawTasks) {
      res.status(404).json({
        errors: [],
        message: 'Задачи не найдены'
      })
    }

    const tasks = await utils.transformTasksArray(rawTasks)

    res.status(200).json(tasks)
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
  createTask,
  updateTask,
  removeTask,
  updateTaskStatus,
  getManagedTasks
}