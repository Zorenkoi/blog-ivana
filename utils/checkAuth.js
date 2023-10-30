import { parseToken } from './tokenUtils.js'

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const { userId, userName } = parseToken(token)
      req.userId = userId
      req.userName = userName
      next()
    } catch (error) {
      return res.status(403).send({
        message: 'нет доступа',
      })
    }
  } else {
    return res.status(403).send({
      message: 'нет доступа',
    })
  }
}
