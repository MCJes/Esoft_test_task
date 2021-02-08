import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
      // return res.redirect('/auth')
      return res.status(401).json({
        message: 'Нет авторизации'
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken

    next()
  } catch (e) {
    // res.redirect('/auth')
    return res.status(401).json({
      message: 'Нет авторизации'
    })
  }
}