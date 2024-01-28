"use client"
import React from 'react';
import { ModeToggle } from '@/components/themeToggle';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

function Navbar({ open, setOpen }) {
  const path = usePathname()

  return (
    <div className="w-full p-3 border-b flex items-center justify-between">
      <div className="flex items-center gap-x-4">
       {/* {path!='/login' && <div className="sm:hidden" onClick={() => setOpen((prev) => !prev)}>
          <Menu />
        </div>} */}
        <span className="font-extrabold">Present</span>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
