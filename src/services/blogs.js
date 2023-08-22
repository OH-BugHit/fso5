import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(`newToken: ${token}`);
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createBlog = async (user, newBlog) => {
  console.log("tätä haetaan", user.token);
  setToken(user.token)
  const headers = {
    headers: { Authorization: token }
  }
  console.log(headers);
  const response = await axios.post(baseUrl, newBlog, headers)
  return response.data
}

export default {
  getAll,
  createBlog
}