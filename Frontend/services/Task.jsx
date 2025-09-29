import { axiosClient } from "../api/axios"


const Task = {
  getCSRFToken : async () => {
    return await axiosClient.get('/sanctum/csrf-cookie')
  },
  getAll: async () => {
    return axiosClient.get('/api/tasks')
  },
  getTask: async (id) => {
    return axiosClient.get(`/api/tasks/${id}`)
  },
  create: async (payload) => {
    try {
      const response = await axiosClient.post('/api/tasks', payload);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  delete: async (id) => {
    return axiosClient.delete(`/api/tasks/${id}`)
  },
  update: async (id,payload) => {
    return axiosClient.put(`/api/tasks/${id}`,payload)
  }
}

export default Task
