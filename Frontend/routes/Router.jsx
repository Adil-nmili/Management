import {createBrowserRouter,} from 'react-router-dom'
import Layout from '../src/Layout'
import Login from '../src/pages/Login'
import Dashboard from '../src/pages/Dashboard'
import AdminsList from '../src/pages/admin/AdminsList'
import AdminCreate from '../src/pages/admin/AdminCreate'
import EmployeesList from '../src/pages/employee/EmployeesList'
import EmployeeCreate from '../src/pages/employee/EmployeeCreate'
import Departemants from '../src/pages/departement/Departemants'
import TasksList from '../src/pages/tasks/TasksList'
import TaskCreate from '../src/pages/tasks/TaskCreate'
import Services from '../src/pages/services/Services'
import ServiceCreate from '../src/pages/services/ServiceCreate'


export const LOGIN = '/'
export const HOME = '/dashboard'
export const ADMINS = '/dashboard/admins'
export const CREATEADMIN = '/dashboard/admins/create'
export const EMPLOYEES = '/dashboard/employees'
export const CREATEEMPLOYEE = '/dashboard/employees/create'
export const DEPARTMENTS = '/dashboard/departments'
export const CREATEDEPARTMENT = '/dashboard/departments/create'
export const TASKS = '/dashboard/tasks'
export const CREATETASK = '/dashboard/tasks/create'
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
                path : ADMINS,
                element : <AdminsList />
            },
            {
                path : CREATEADMIN,
                element : <AdminCreate />
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