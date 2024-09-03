"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuLink = ({ item }) => {
    const pathname = usePathname()
    // console.log(pathname);
    return (
        <Link href={item.path} className='p-5 flex my-1.5 items-center gap-2.5 rounded-xl ${pathname === item.path ? "bg-[#f3f3f3]" : ""} hover:bg-[#f3f3f3] '>
            {item.title}
        </Link>
    )
}

export default MenuLink
