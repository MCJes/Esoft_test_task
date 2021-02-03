import bcrypt from 'bcrypt'

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const isPasswordMatches = async (password, hashedPassword) => {
  const math = await bcrypt.compare(password, hashedPassword)
  return math
}

export default  {
  getHashedPassword,
  isPasswordMatches
}