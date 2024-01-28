"use client"

import React from 'react'
import Navbar from '@/components/system/navigation/navbar'
import { TabsDemo } from '@/components/system/login/form'

function Page() {
  return (
    <div className='w-full h-screen flex flex-col'>
    <Navbar/>
    <div className='w-screen h-full flex justify-center items-center bg-[linear-gradient(90deg,#56CCF2,#2F80ED)]'>
        <TabsDemo/>
    </div>    
    </div>
  )
}

export default Page

