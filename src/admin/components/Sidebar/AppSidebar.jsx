import React from "react";
import { useLocation, Link } from "react-router-dom";
import ProfileMenu from "@/auth/ProfileMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/shared/ui/sidebar";
import { BookUser, Calendar, Home, Inbox, Users } from "lucide-react";

const items = [
  { title: "Locations", url: "locations", icon: Home },
  { title: "Services", url: "services", icon: Inbox },
  { title: "Employees", url: "employees", icon: Calendar },
  { title: "Bookings", url: "bookings", icon: BookUser },
  { title: "Users", url: "users", icon: Users },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <> 
    <Sidebar className="bg-white border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
        <SidebarGroupLabel className="bg-black flex items-center space-x-2 text-lg font-semibold text-white px-4 py-4 my-2" style={{height:"40px"}}>
        <span style={{ color: "rgba(254, 0, 0, 0.76)",fontSize:"30px" }}>Define</span>
            <span style={{fontSize:"30px"}}>Salon</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname.includes(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={`/admin/${item.url}`}
                        className={`flex items-center p-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-red-600 text-white"
                            : ""
                        }`}
                      >
                        <item.icon className="mr-3" size={20} />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <ProfileMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </>
  );
}
