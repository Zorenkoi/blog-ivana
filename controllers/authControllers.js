import { hashPassword, comparePassword } from '../utils/bcryptUtils.js'
import { createToken } from '../utils/tokenUtils.js'
import User from '../models/User.js'

export const registration = async (req, res) => {
  try {
    const passwordHash = await hashPassword(req.body.password)

    const userItem = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      iconUrl: req.body.iconUrl,
      passwordHash,
    })

    const user = await userItem.save()

    const token = createToken(user._id, user.fullName)

    res.status(200).json({
      success: true,
      userId: user._id,
      userName: user.fullName,
      token,
      message: 'пользователь зарегестрирован',
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'ошибка при регистрации',
    })
  }
}
export const login = async (req, res) => {
  try {
    const { password, email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'пользователь не найден',
      })
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash)
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'пароль не верный',
      })
    }

    const token = createToken(user._id, user.fullName)

    return res.status(200).json({
      success: true,
      userId: user._id,
      userName: user.fullName,
      token,
      message: 'авторизация успешна',
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: 'ошибка при авторизации',
    })
  }
}
export const authMe = async (req, res) => {
  try {
    res.status(200).json({
      userId: req.userId,
      userName: req.userName,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
    })
  }
}
