import { ThemeProvider } from "@/components/theme-provider"
import AdminContext from "../context/AdminContext"
import { RouterProvider } from "react-router-dom"
import Router from "../routes/Router"

function App() {
 

  return (
    <AdminContext>
    <ThemeProvider defaultTheme="light" storageKey="theme">
    <RouterProvider  router={Router}/>
  </ThemeProvider>
  
  </AdminContext>
  )
}

export default App
