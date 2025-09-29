import { axiosClient } from "../api/axios"

const Position =  {
  getCSRFToken : async () => {
    return await axiosClient.get('/sanctum/csrf-cookie')
  },
  create: async (payload) => {
    return axiosClient.post('/api/positions',payload)
  },
  update: async (id,payload) => {
    return axiosClient.put(`/api/positions/${id}`,payload)
  },
  delete: async (id) => {
    return axiosClient.delete(`/api/positions/${id}`)
  },
  getAll: async () => {
    return axiosClient.get('/api/positions')
  },
  getPosition: async (id) => {
    return axiosClient.get(`/api/positions/${id}`)
  }
}

export default Position