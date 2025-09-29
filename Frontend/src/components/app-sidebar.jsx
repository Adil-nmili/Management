import {
    ArrowDownUp,
    Home,
    ListTodo,
    LogOut,
    Send,
    ShoppingCart,
    SquarePlus,
    User,
    Users,
  } from "lucide-react";
  
  import { Link, useLocation } from "react-router-dom";

  import {HOME,MANAGERS,MANAGERCREATE,EMPLOYEES,CREATEEMPLOYEE,DEPARTMENTS,SERVICES,CREATESERVICE,TASKS, CREATETASK} from '../../routes/Router'
  
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
  } from "./ui/sidebar";
  import { Button } from "./ui/button";
import { useAdminContext } from "../../context/AdminContext";
  
  export function AppSidebar() {
    const location = useLocation();

   const { logout } = useAdminContext();
    const handleLogout = () =>{
      logout();
    }
  
    return (
      <div className="bg-slate-900 text-white h-screen">
        <Sidebar>
          <SidebarHeader>
            <Link
              to={"/"}
              className=" text-center flex items-center justify-center  w-full"
            >
              SYSTEME MANAGEMENT
            </Link>
          </SidebarHeader>
          <SidebarContent style={{scrollbarWidth: "none"}}>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={HOME}
                        className={` ${
                          location.pathname === "/dashboard"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <Home />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Admins</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={MANAGERS}
                        className={` ${
                          location.pathname === "/dashboard/managers"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <User />
                        <span>Managers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={MANAGERCREATE}
                        className={` ${
                          location.pathname === "/dashboard/managers/new"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <SquarePlus />
                          <span>New Manager</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {/* ////////////////////////// */}
            <SidebarGroup>
              <SidebarGroupLabel>Tasks</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={TASKS}
                        className={` ${
                          location.pathname === "/dashboard/tasks"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <ListTodo />
                        <span>Tasks</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={CREATETASK}
                        className={` ${
                          location.pathname === "/dashboard/tasks/new"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <SquarePlus />
                        <span>New Task</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Employees</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={EMPLOYEES}
                        className={` ${
                          location.pathname === "/dashboard/employees"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <Users />
                        <span>Employees</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={CREATEEMPLOYEE}
                        className={` ${
                          location.pathname === "/dashboard/employees/new"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <SquarePlus />
                        <span>Employees</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem> */}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Orders</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={DEPARTMENTS}
                        className={` ${
                          location.pathname === "/dashboard/departments"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <ArrowDownUp />
                        <span>Departements</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Services</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={SERVICES}
                        className={` ${
                          location.pathname === "/dashboard/services"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <Send />
                        <span>Services</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to={CREATESERVICE}
                        className={` ${
                          location.pathname === "/dashboard/services/new"
                            ? "bg-slate-800 text-gray-100"
                            : ""
                        }`}
                      >
                        <SquarePlus />
                        <span>Service</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="pb-4">
            <Button onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
      </div>
    );
  }
  