import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar'
import React, { useEffect } from 'react'
import { AppSidebar } from '../components/Sidebar/AppSidebar'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
const navigate = useNavigate()
useEffect(()=>{
  navigate("/admin/locations")
},[])
  return (
<></>
   
  )
}

export default AdminHome