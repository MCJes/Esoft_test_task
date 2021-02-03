import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

//create table users

//CREATE TABLE `todolist`.`users` ( `id` INT NOT NULL AUTO_INCREMENT , `userName` VARCHAR(255) NOT NULL , `name` VARCHAR(255) NOT NULL , `middleName` VARCHAR(255) NOT NULL , `sirname` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `leaderId` INT NOT NULL , PRIMARY KEY (`id`), UNIQUE (`userName`)) ENGINE = InnoDB;
// CREATE TABLE `todolist`.`tasks` ( `id` INT NOT NULL , `heading` VARCHAR(255) NOT NULL , `description` VARCHAR(1000) NOT NULL , `priority` INT NOT NULL , `status` INT NOT NULL , `creatorId` INT NOT NULL , `managerId` INT NOT NULL , `createdAt` BIGINT NOT NULL , `updatedAt` BIGINT NOT NULL , `completedAt` BIGINT NOT NULL , PRIMARY KEY (`id`), INDEX (`creatorId`), INDEX (`managerId`), INDEX (`priority`), INDEX (`status`)) ENGINE = InnoDB;

//create mysql connection (with promises)
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DBNAME
}).promise()

const insertIntoTable = async (table, items) => {
  if(!items || !table || Object.keys(items).length === 0)
    throw new Error('Значение не может быть пустым!')

  const keys = Object.keys(items).join(',')
  const values =  Object.values(items).join("','")

  const queryString = `INSERT INTO ${table} (${keys}) VALUES ('${values}')`
  const result = await connection.query(queryString)

  return result
}

const selectById = async (table, id) => {
  const queryString = `SELECT * FROM ${table} WHERE id = '${id}'`
  const [ rows ] = await connection.query(queryString)
  let item
  if(rows.length !== 0) {
    item = {
      ...rows[0]
    }
  }
  return item
}

const selectByUserName = async (table, userName) => {
  const queryString = `SELECT * FROM ${table} WHERE userName = '${userName}'`
  const [ rows ] = await connection.query(queryString)
  let item
  if(rows.length !== 0) {
    item = {
      ...rows[0]
    }
  }
  return item
}

export default {
  insertIntoTable,
  selectById,
  selectByUserName
}
