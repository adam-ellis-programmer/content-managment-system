import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

const updatImgURL = API_BASE_URL + '/api/site/home-img'

const updateImg = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(data)
  console.log(token)
  console.log(config)
  const response = await axios.post(updatImgURL, data, config)
  console.log(response)
  // return response.data
}

const siteService = {
  updateImg,
}

export default siteService
