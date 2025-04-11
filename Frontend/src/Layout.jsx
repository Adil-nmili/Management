import { useState,  useEffect } from "react";
import { useAdminContext } from "../context/AdminContext";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Nav from "./components/partials/Nav";
import { Loader } from "lucide-react";
import { Toaster} from "./components/ui/sonner"

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { authenticate, admin } = useAdminContext();
  const navigator = useNavigate();


useEffect(() => {
  if (authenticate === true) {
    setIsLoading(false);
  } else {
    navigator("/"); 
  }
},[authenticate,isLoading])

if (isLoading) {
  return (
      <div className="h-screen w-screen flex justify-center items-center">
          <Loader className="animate-spin text-4xl" />
      </div>
  );
}
  

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-50 dark:bg-slate-900 h-screen w-full">
        <Nav admin={admin} />
        <Outlet />
        <Toaster />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
