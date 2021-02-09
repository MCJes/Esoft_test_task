export const request = async (url, method = 'GET', data = null) => {
  try {
    let body
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    if(data) {
      headers['Content-type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch(`/api${url}`, {
      method,
      body,
      headers,
    })

    return await response.json()
  } catch (e) {
    return false
  }
}