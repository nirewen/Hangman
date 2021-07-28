import axios from 'axios'

const { NODE_ENV } = process.env

const api = axios.create(
    NODE_ENV !== 'production'
        ? {
              baseURL: `http://localhost:3001`,
          }
        : undefined
)

export default api
