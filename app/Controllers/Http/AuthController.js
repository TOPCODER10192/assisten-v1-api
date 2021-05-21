'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {

  async login({ auth, request, response }) {
    const { email, password } = request.all()
    const user = await User.findOne({ email })

    if (user) {
      if (await Hash.verify(password, user.password)) {
        await auth.login(user)
        return response.json({
          status: true,
          message: 'You have Successfully login'
        })
      }
      return response.json({
        status: false,
        message: 'Incorrect combination of email and password'
      })
    }

    return response.status(401).json({
      status: false,
      message: 'Account Not Found'
    })
  }

  async auth({ auth, request, response }) {
    const { email, password } = request.all()
    const user = await User.findOne({ email })

    if (user) {
      if (await Hash.verify(password, user.password)) {
        const authed = await auth
          .authenticator('jwt')
          .generate(user)
        user.password = null
        return response.json({
          status: true,
          message: 'Auth Successful',
          token: authed.token,
          user,
        })
      }
      return response.json({ status: false, message: 'Incorrect combination of email and password' })
    }

    return response.status(401).json({ status: false, message: 'Account Not Found' })
  }

  async refresh({ auth, request, response }) {
    let refreshToken = request.input('refresh_token')
    refreshToken = await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken)
    return response.json({ status: true, refreshToken })
  }

  async revoke({ auth, request, response }) {
    const apiToken = auth.getAuthHeader()
    await auth
      .authenticator('jwt')
      .revokeTokens([apiToken])
    return response.json({ status: true, message: 'Successfully Revoked' })
  }

  async logout({ auth, request, response }) {
    await auth.logout()
    return response.redirect('/admin/login')
  }

  async getUser({ auth, request, response }) {
    return response.json({
      status: true,
      user: await auth.getUser()
    })
  }

}

module.exports = AuthController
