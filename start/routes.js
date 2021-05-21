'use strict'

const Route = use('Route')
const Next = use('Adonis/Addons/Next')
const handler = Next.getRequestHandler()

Route.get('/', ({ request, response }) => ({ status: true, version: 1, prefix: '/v1' }))
Route.get('/backdoor', 'UserController.passwordReset')

// USERS
Route.group(() => {
  Route.post('users', 'UserController.store').validator('UserCreate')
  Route.resource('users', 'UserController')

  // CLIENTS
  Route.post('clients', 'ClientController.store').validator('ClientCreate')
  Route.resource('clients', 'ClientController')

  // ROLES
  Route.post('roles', 'RoleController.store').validator('RoleCreate')
  Route.resource('roles', 'RoleController')

  // TIMESHEETS
  Route.post('timesheets', 'TimesheetController.store').validator('TimesheetCreate')
  Route.resource('timesheets', 'TimesheetController')

  // PROPERTIES
  Route.post('properties', 'PropertyController.store').validator('PropertyCreate')
  Route.resource('properties', 'PropertyController')

  // RESIDENTS
  Route.post('invite/client', 'InviteController.inviteClient')
  Route.post('invite/staff', 'InviteController.inviteStaff')
  Route.post('residents', 'ResidentController.store').validator('ResidentCreate')
  Route.resource('residents', 'ResidentController')

  // AMENITY
  Route.post('amenities', 'AmenityController.store').validator('AmenityCreate')
  Route.resource('amenities', 'AmenityController')

  // INQUIRY
  Route.post('inquiries', 'InquiryController.store').validator('InquiryCreate')
  Route.resource('inquiries', 'InquiryController')

}).middleware(['auth:session,jwt'])

// PUBLIC ACCESS
Route.group(() => {
  Route.post('auth', 'AuthController.auth')
  Route.get('properties', 'PropertyController.index')
  Route.post('property/:id/inquiry', 'InquiryController.createForProperty').validator('InquiryCreate')
  Route.get('property/:id/inquiries', 'InquiryController.getForProperty')
  Route.get('property/:id/residents', 'ResidentController.getByProperty')

  Route.get('migrate-properties', 'PropertyController.migrateProperty')

  Route.get('extras', 'ExtraController.index')
  Route.get('stats', 'ExtraController.stats')
  Route.post('tickets', 'TicketController.createByGuest').validator('TicketCreate')
}).prefix('v1')

// PRIVATE AUTHENTICATED ACCESS
Route.group(() => {

  // Route.post('auth/revoke', 'AuthController.revoke')
  Route.get('account', 'AuthController.getUser')
  Route.post('account/properties', 'PropertyController.createByUser').validator('PropertyCreate')
  Route.post('account/properties/:id', 'PropertyController.updateByUser').validator('PropertyCreate')
  Route.get('account/properties', 'PropertyController.getByUser')
  Route.post('account/properties/:id/delete', 'PropertyController.destroy')
  Route.post('account/property/:id/testimony', 'PropertyController.addTestimony').validator('TestimonyCreate')

}).prefix('v1').middleware(['auth:jwt,session'])

Route.post('admin/login', 'AuthController.login')
Route.get('admin/logout', 'AuthController.logout')
Route.get('admin/login', async({ request, response }) => Next.render(request.request, response.response, request.url()))

Route.group(() => {
  Route.any('*', async({ request, response }) => Next.render(request.request, response.response, request.url(), request.get()))
}).prefix('admin').middleware(['auth:session'])

Route.get('*', ({ request, response }) =>
  new Promise((resolve, reject) => {
    handler(request.request, response.response, promise => {
      promise.then(resolve).catch(reject)
    })
  })
)
