import bcrypt from 'bcrypt'
import dataBase from '../db/dataBase.js'

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const isPasswordMatches = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword)
  return match
}

const transformTasksArray = async (arr) => {
  const transformedArray = []
  for (const key in arr) {
    let priority = await dataBase.selectBy('priorities', {
      id: arr[key].priority
    })
    let status = await dataBase.selectBy('statuses', {
      id: arr[key].status
    })
    let managerId = arr[key].managerId
    let creatorId = arr[key].creatorId
    const task = {
      ...arr[key],
      priority: {
        id: arr[key].priority,
        value: priority[0].priority
      },
      status: {
        id: arr[key].status,
        value: status[0].status
      },
      manager: {
        id: managerId,
        value: await selectUser(managerId)
      },
      creator: {
        id: creatorId,
        value: await selectUser(creatorId)
      }
    }
    delete task.managerId
    delete task.creatorId
    transformedArray.push(task)
  }
  return transformedArray
}

const selectUser = async (id) => {
  const user = await dataBase.selectBy('users', {
    id
  }, ['username', 'name', 'surname', 'middleName'])
  return user[0]
}

const transformResult = (object) => {
  const o = object[0]
  const newObj = {}

  for (const item in o) {
    newObj[item] = o[item]
  }

  return newObj
}

export default  {
  getHashedPassword,
  isPasswordMatches,
  transformTasksArray,
  transformResult
}