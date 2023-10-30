import jwt from 'jsonwebtoken'

const jwtSecretKey = '123'
const jwtLiveTime = '5h'

export const createToken = (userId, userName) => {
  return jwt.sign({ userId, userName }, jwtSecretKey, {
    expiresIn: jwtLiveTime,
  })
}

export const parseToken = (token) => {
  return jwt.verify(token, jwtSecretKey)
}
