const baseURL = import.meta.env.VITE_BACKEND_URL

export default {
  async get(endpoint, token = null) {
    let headers = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return await fetch(baseURL + endpoint, { method: 'GET', headers })
  },

  post(endpoint, body, token = null) {
    let headers = {
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'POST', headers, body: body })
  },

  postJSON(endpoint, body = {}, token = null) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'POST', headers, body: JSON.stringify(body) })
  },

  put(endpoint, body, token = null) {
    let headers = {
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'PUT', headers, body: body })
  },

  patch(endpoint, body, token = null) {
    let headers = {
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'PATCH', headers, body: body })
  },

  delete(endpoint, token = null) {
    let headers = {
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return fetch(baseURL + endpoint, { method: 'DELETE', headers })
  }
}