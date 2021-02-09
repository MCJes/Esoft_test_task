import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

//create mysql connection (with promises)
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DBNAME
}).promise()

const insertIntoTable = async (table, fields) => {
  if(!fields || !table || Object.keys(fields).length === 0)
    throw new Error('Значение не может быть пустым!')

  const keys = Object.keys(fields).join(',')
  const values =  Object.values(fields).join("','")

  const queryString = `INSERT INTO ${table} (${keys}) VALUES ('${values}')`
  const result = await connection.query(queryString)

  return result
}

//select from table with params
const selectBy = async (table, params = {}, fields = '*') => {

  //get param name that matches with field name
  const key = Object.keys(params)[0]

  if(!key)
    throw new Error('Параметр не может быть пустым')
  let queryString = ''
  if(fields === '*')
    queryString = `SELECT ${fields} FROM ${table} WHERE ${key}='${params[key]}'`
  else
    queryString = `SELECT ${fields.join(',')} FROM ${table} WHERE ${key}='${params[key]}'`

  //get result rows
  const [ rows ] = await connection.query(queryString)
  if(rows.length !== 0) {
    return rows
  }
  return false
}

const selectAll = async (table) => {
  const [ rows ] = await connection.query(`SELECT * FROM ${table}`)

  if(rows.length !== 0) {
    return rows
  }
  return false
}

const updateTable = async (table, fields, id) => {
  if(!fields || !table || Object.keys(fields).length === 0)
    throw new Error('Значение не может быть пустым!')

  //set changes like fieldName='fieldValue'
  const changes = []
  for (const key in fields) {
    changes.push(`${key}='${fields[key]}'`)
  }

  const queryString = `UPDATE ${table} SET ${changes.join(',')} WHERE id=${id}`
  const result = await connection.query(queryString)

  return result
}

const removeBy = async (table, params = {}) => {
  const key = Object.keys(params)[0]

  if(!key)
    throw new Error('Параметр не может быть пустым')

  let queryString = `DELETE FROM ${table} WHERE ${key}='${params[key]}'`

  await connection.query(queryString)
}

export default {
  insertIntoTable,
  updateTable,
  selectBy,
  removeBy,
  selectAll
}
