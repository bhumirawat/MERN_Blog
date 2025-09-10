import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    <SidebarProvider>
      <Navbar />
        <AppSidebar />
        <main className=" w-full ">
          <div className="w-full min-h-[calc(100vh-45px)] py-28 px-10">
            <Outlet />
          </div>
          <Footer />
        </main>
    </SidebarProvider>
  )
}

export default Layout



