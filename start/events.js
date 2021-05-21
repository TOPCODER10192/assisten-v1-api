const Event = use('Event')
const Mail = use('Mail')

Event.on('mail:invite:client', async(user) => {
  await Mail.send('mail.invite', user, (message) => {
    message.to(user.email)
    message.from('from@email')
  })
})

Event.on('mail:invite:staff', async(user) => {
  await Mail.send('mail.invite', user, (message) => {
    message.to(user.email)
    message.from('from@email')
  })
})
