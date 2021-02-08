import {request} from "@/utils/request";

export const veryfy = async (token) => {
  if(!token) {
    return false
  }

  const response = await request('/user/verify', 'POST', {
    token
  })

  if(!response.decodedToken) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return false
  }

  return true
}