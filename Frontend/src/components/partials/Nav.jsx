import { SidebarTrigger } from "../ui/sidebar";
import { useLocation } from "react-router-dom";
import {ModeToggle} from "../mode-toggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useAdminContext } from "../../../context/AdminContext";


function Nav({admin}) {
  const location = useLocation();
  const { logout } = useAdminContext();
  const path = location.pathname.slice(10).replaceAll('/',' > ');
  const letterSpacing = {
    letterSpacing: "2px",
  };
  return (
    <nav className="bg-white dark:bg-slate-800 h-16 px-16 relative w-full flex items-center gap-10 ">
      <div className="absolute left-1">
        <SidebarTrigger />
      </div>
      <ul className="flex justify-between w-full gap-10" style={letterSpacing}>
        <h2 className="capitalize font-semibold ">
          Dashboard {path}
          {/* {path === "dashboard" ? "" : ` > ${path}`} */}
        </h2>
        {
          admin != {} ?
            <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback className="uppercase font-bold">
                    {admin && admin.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{admin && admin.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="font-semibold text-xs italic">{admin && admin.name}</span>
          </div>
          : ''
        }
        
        
      </ul>
      <div className="absolute right-4">
      <ModeToggle />
      </div>
    </nav>
  );
}

export default Nav;
