'use strict'

const Invite = use('App/Models/Invite')

class InviteController {
  async inviteClient({ auth, request, response }) {
    let inviteData = request.all()
    inviteData.addedBy = auth.user._id
    await Invite.create(inviteData)
    // todo: email sending
    return response.json({ status: true })
  }

  async inviteStaff({ request, response }) {

  }
}

module.exports = InviteController
