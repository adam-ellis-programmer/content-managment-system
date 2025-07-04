import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

const API_URL = API_BASE_URL + '/api/tasks/'

const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, taskData, config)

  return response.data
}

const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const deleteTask = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const updateTask = async (id, token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + id, data, config)

  return response.data
}

const taskService = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
}

export default taskService
