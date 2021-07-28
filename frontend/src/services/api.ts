import axios from 'axios'

const { ENVIRONMENT } = process.env

const api = axios.create(
    ENVIRONMENT !== 'production'
        ? {
              baseURL: `http://localhost:3001`,
          }
        : undefined
)

export default api
