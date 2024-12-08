import ProfileMenu from "@/auth/ProfileMenu"
import {  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem } from "@/shared/ui/sidebar"
import { BookUser, Calendar, Home, Inbox, Users } from "lucide-react"



// Menu items.
const items = [
  {
    title: "Locations",
    url: "locations",
    icon: Home,
  },
  {
    title: "Services",
    url: "services",
    icon: Inbox,
  },
  {
    title: "Employees",
    url: 'employees',
    icon: Calendar,
  },
  {
    title: "Bookings",
    url: "bookings",
    icon: BookUser,
  },
  {
    title: "Users",
    url: "users",
    icon: Users,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={`/admin/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <ProfileMenu/>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
