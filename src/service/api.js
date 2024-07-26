const baseURL = import.meta.env.VITE_BACKEND_URL

export default {
  get (endpoint, token = null) {
    let headers = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'GET', headers })
  },

  post (endpoint, body, token = null) {
    let headers = {
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'POST', headers, body: body })
  },

  put (endpoint, body, token = null) {
    let headers = {
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'PUT', headers, body: body })
  }
}