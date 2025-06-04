// config/api.js
const getBaseURL = () => {
  // In development, use the proxy (empty string)
  if (process.env.NODE_ENV === 'development') {
    return ''
  }

  // In production, use your deployed backend URL
  return process.env.REACT_APP_API_URL || 'https://content-managment-system-lake.vercel.app'
}
 
export const API_BASE_URL = getBaseURL()
