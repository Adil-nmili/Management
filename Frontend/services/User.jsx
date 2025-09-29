import { axiosClient } from  '../api/axios'

const User =  {
  getCSRFToken : async () => {
    return await axiosClient.get('/sanctum/csrf-cookie')
  },
  login : async (payload) => {
    return axiosClient.post('/api/login',payload)
  },
  register : async (payload) => {
    return axiosClient.post('/api/register',payload)
  },
  logout : async () => {
    return axiosClient.post('/api/logout')
  },
  // Managers
  getManagers : async () => {
    return axiosClient.get('/api/managers')
  },
  getManager : async (id) => {
    return axiosClient.get(`/api/managers/${id}`)
  },
  createManager : async (payload) => {
    return axiosClient.post('/api/managers',payload)
  },
  updateManager : async (id,payload) => {
    return axiosClient.put(`/api/managers/${id}`,payload)
  },
  deleteManager : async (id) => {
    return axiosClient.delete(`/api/managers/${id}`)
    },
  // Employees
  getEmployees : async () => {
    return axiosClient.get('/api/employees')
  },
  getEmployee : async (id) => {
    return axiosClient.get(`/api/employees/${id}`)
  },
  createEmployee : async (payload) => {
    return axiosClient.post('/api/employees',payload)
  },
  updateEmployee : async (id,payload) => {
    return axiosClient.put(`/api/employees/${id}`,payload)
  },
  deleteEmployee : async (id) => {
    return axiosClient.delete(`/api/employees/${id}`)
  },
  //Directors
  getDirectors : async () => {
    return axiosClient.get('/api/directors')
  },
  getDirector : async (id) => {
    return axiosClient.get(`/api/directors/${id}`)
  },
  createDirector : async (payload) => {
    return axiosClient.post('/api/directors',payload)
  },
  updateDirector : async (id,payload) => {
    return axiosClient.put(`/api/directors/${id}`,payload)
  },
  deleteDirector : async (id) => {
    return axiosClient.delete(`/api/directors/${id}`)
  }
}

export default User
