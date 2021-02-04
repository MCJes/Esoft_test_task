import bcrypt from 'bcrypt'
import dataBase from "../db/dataBase.js";

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const isPasswordMatches = async (password, hashedPassword) => {
  const math = await bcrypt.compare(password, hashedPassword)
  return math
}

const transformTasksArray = async (arr) => {
  const transformedArray = []
  for (const key in arr) {
    let priorityId = arr[key].priority
    let statusId = arr[key].status
    let managerId = arr[key].managerId
    let creatorId = arr[key].creatorId
    const task = {
      ...arr[key],
      priority: {
        id: priorityId,
        value: await dataBase.selectBy('priorities', {
          id: priorityId
        })
      },
      status: {
        id: statusId,
        value: await dataBase.selectBy('statuses', {
          id: statusId
        })
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

export default  {
  getHashedPassword,
  isPasswordMatches,
  transformTasksArray
}