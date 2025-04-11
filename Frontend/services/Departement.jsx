import { axiosClient } from "../api/axios"



const Departement =  {
  getCSRFToken : async () => {
    return await axiosClient.get('/sanctum/csrf-cookie')
  },
  getManager : async () => {
    return await axiosClient.get('/api/managers')
  },
  create: async (payload) => {
    return axiosClient.post('/api/departements',payload)
  },
  update: async (id,payload) => {
    return axiosClient.put(`/api/departements/${id}`,payload)
  },
  delete: async (id) => {
    return axiosClient.delete(`/api/departements/${id}`)
  },
  getAll: async () => {
    return axiosClient.get('/api/departements')
  }
}

export default Departement
