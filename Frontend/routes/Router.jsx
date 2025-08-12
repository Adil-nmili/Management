import {createBrowserRouter,} from 'react-router-dom'
import Layout from '../src/Layout'
import Login from '../src/pages/Login'
import Dashboard from '../src/pages/Dashboard'
import Managers from '../src/pages/admin/Managers'
import ManagerCreate from '../src/pages/admin/ManagerCreate'
import ManagerEdit from '../src/pages/admin/ManagerEdit'
import EmployeesList from '../src/pages/employee/EmployeesList'
import EmployeeCreate from '../src/pages/employee/EmployeeCreate'
import Departemants from '../src/pages/departement/Departemants'
import TasksList from '../src/pages/tasks/TasksList'
import TaskCreate from '../src/pages/tasks/TaskCreate'
import Services from '../src/pages/services/Services'
import ServiceCreate from '../src/pages/services/ServiceCreate'



export const LOGIN = '/'
export const HOME = '/dashboard'
// Managers
export const MANAGERS = '/dashboard/managers'
export const MANAGERCREATE = '/dashboard/managers/create'
export const MANAGEREDIT = '/dashboard/managers/:id/edit'
export const MANAGERSHOW = '/dashboard/managers/show/:id'
// Employees
export const EMPLOYEES = '/dashboard/employees'
export const CREATEEMPLOYEE = '/dashboard/employees/create'
// Departements
export const DEPARTMENTS = '/dashboard/departments'
export const CREATEDEPARTMENT = '/dashboard/departments/create'
// Tasks
export const TASKS = '/dashboard/tasks'
export const CREATETASK = '/dashboard/tasks/create'
// Services
export const SERVICES = '/dashboard/services'
export const CREATESERVICE = '/dashboard/services/create'

 const Router = createBrowserRouter([
    {
        element : <Layout /> ,
        children: [
            {
                path : HOME,
                element : <Dashboard />

            },
            {
                path : MANAGERS,
                element : <Managers />
            },
            {
                path : MANAGERCREATE,
                element : <ManagerCreate />
            },
            {
                path : MANAGEREDIT,
                element : <ManagerEdit />
            },
            {
                path : EMPLOYEES,
                element : <EmployeesList />
            },
            {
                path : CREATEEMPLOYEE,
                element : <EmployeeCreate />
            },
            {
                path : DEPARTMENTS,
                element : <Departemants />
            },
            {
                path : TASKS,
                element : <TasksList />
            },
            {
                path : CREATETASK,
                element : <TaskCreate />
            },
            {
                path : SERVICES,
                element : <Services />
            },
            {
                path : CREATESERVICE,
                element : <ServiceCreate />
            },
            
        ]
    },
    {
        path : LOGIN, 
        element : <Login />
    }
])

export default Router