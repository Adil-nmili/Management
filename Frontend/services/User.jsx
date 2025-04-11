import { axiosClient } from  '../api/axios'

const User =  {
  getCSRFToken : async () => {
    return await axiosClient.get('/sanctum/csrf-cookie')
  },
  login : async (payload) => {
    return axiosClient.post('/api/login',payload)
  },
  create: async (payload) => {
    return axiosClient.post('/api/register',payload)
  },
  delete: async (id) => {
    return axiosClient.delete(`/api/users/${id}`)
  },
  update: async (id,payload) => {
    return axiosClient.put(`/api/users/${id}`,payload)
  },
  getAll: async () => {
    return axiosClient.get('/api/users')
  },

}

export default User
