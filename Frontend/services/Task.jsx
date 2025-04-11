import { axiosClient } from "../api/axios"


const Task = {
  getCSRFToken : async () => {
    return await axiosClient.get('/sanctum/csrf-cookie')
  },
  getAll: async () => {
    return axiosClient.get('/api/tasks')
  },
  create: async (payload) => {
    return axiosClient.post('/api/tasks',payload)
  },
  delete: async (id) => {
    return axiosClient.delete(`/api/tasks/${id}`)
  },
  update: async (id,payload) => {
    return axiosClient.put(`/api/tasks/${id}`,payload)
  }
}

export default Task
