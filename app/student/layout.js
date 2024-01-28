"use client"

import Navbar from "@/components/system/navigation/navbar"
import Sidebar from "@/components/system/navigation/sidebar"
import { useState } from "react"



export default function StudentLayout({children}) {
  const [open,setOpen]=useState(false)
  return (
    <main className="flex h-screen flex-col">
      <Navbar open={open} setOpen={setOpen}/>
      <div className="w-full h-full flex">
        {/* <div className={`w-64 border-r absolute top-0 transition-all duration-500 ease-in-out z-50 ${open?'left-[0%]':'max-sm:left-[-100%]'} max-sm:h-screen sm:relative bg-background`}>
          <Sidebar open={open} setOpen={setOpen}/>
        </div> */}
        <div className="sm:w-[calc(100%-16rem)] w-full p-1">
            {children}
        </div>        
      </div>
    </main>
  )
}
