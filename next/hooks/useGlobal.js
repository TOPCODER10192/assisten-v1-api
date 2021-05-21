import React from 'react';
import globalHook from './globalHook';
import actions from './actions';

const initialState = {
  user: false,

  users: [],
  usersLoaded: false,

  client: false,
  clients: [],
  clientsLoaded: false,

  employees: [],
  employeesLoaded: false,

  roles: [],
  rolesLoaded: false,

  timesheets: [],
  timesheetsLoaded: false,

  tickets: [],
  ticketsLoaded: false,

  properties: [],
  propertiesLoaded: false,

  categories: [],
  categoriesLoaded: false,

  photos: [],

  token: null,
  isLoggedIn: false,

  amenities: [],
  careTypes: [],
  roomTypes: [],
  tags: []
}

const useGlobal = globalHook(React, initialState, actions)

export default useGlobal
