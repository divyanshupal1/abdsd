"use client"
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Presentation ,Users,Hand } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Sidebar({open,setOpen}) {
  const path = usePathname()
  return (
    <div>
        <div className='w-full p-4  flex gap-x-4 sm:hidden'>
            <div className='' onClick={()=>{setOpen(prev=>!prev)}}><Menu/></div>
            <span className="font-extrabold">Present</span>
        </div>
        {
          path.split('/')[1] === 'teacher' && (
            <div className='w-full h-full flex flex-col justify-center items-center pr-7 pt-9'>
              <div className='flex flex-col gap-y-4 w-full pl-4'>
                <Link href='/teacher/classes' className='w-full'>
                  <div className={`w-full flex border-2 transition-colors items-center gap-x-3 p-3 px-6 rounded-full hover:bg-primary-foreground ${path.split('/')[2] === 'classes'?'bg-primary text-white hover:text-black dark:hover:text-white':""}`}>
                    <Presentation />
                    Classes
                  </div>
                </Link>
                <Link href='/teacher/students' className='w-full'>
                <div className={`w-full flex border-2 transition-colors items-center gap-x-3 p-3 px-6 rounded-full hover:bg-primary-foreground ${path.split('/')[2] === 'students'?'bg-primary text-white hover:text-black dark:hover:text-white':""}`}>
                    <Users />
                    Students
                  </div>
                </Link>
                <Link href='/teacher/attendance' className='w-full'>
                <div className={`w-full flex border-2 transition-colors items-center gap-x-3 p-3 px-6 rounded-full hover:bg-primary-foreground ${path.split('/')[2] === 'attendance'?'bg-primary text-white hover:text-black dark:hover:text-white':""}`}>
                    <Hand />
                    Attendance
                  </div>
                </Link>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Sidebar