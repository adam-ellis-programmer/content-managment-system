import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

const API_URL = API_BASE_URL + '/api/users'
const WELCOME_URL = API_BASE_URL + '/api/users/welcome'
const API_URL_ADMIN = API_BASE_URL + '/api/admin/create/'

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  console.log('RESPONSE DATA==>', response)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  // returns the data to the slice
  return response.data
}
const registerAsAdnin = async (token, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL_ADMIN, userData, config)

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)
  console.log('resp', response)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}
const sendWelcomeEmails = async (userData) => {
  console.log(userData)
  const response = await axios.post(WELCOME_URL, userData)
  console.log('RESPONSE DATA==>', response)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}
const logout = () => localStorage.removeItem('user')

// imoorted into slice
const authService = {
  register,
  logout,
  login,
  // admin
  registerAsAdnin,
  // send emails
  sendWelcomeEmails,
}

export default authService
