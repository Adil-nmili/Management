import { axiosClient } from "../api/axios"


const Service =  {
  getCSRFToken : async () => {
    return await axiosClient.get('/sanctum/csrf-cookie')
  },
  create: async (payload) => {
    return axiosClient.post('/api/services',payload)
  },
  update: async (id,payload) => {
    return axiosClient.put(`/api/services/${id}`,payload)
  },
  getAll: async () => {
    return axiosClient.get('/api/services')
  },
  getService: async (id) => {
    return axiosClient.get(`/api/services/${id}`)
  },
  delete: async (id) => {
    return axiosClient.delete(`/api/services/${id}`)
  }
}

export default Service
