import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(5)
  return await bcrypt.hash(password, salt)
}

export const comparePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash)
}
