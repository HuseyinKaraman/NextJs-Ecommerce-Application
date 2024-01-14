import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className='flex p-2 px-5 justify-between bg-gray-100 mb-3 border-2 shadow-sm drop-shadow-md'>
        <Link href={"/"} className='text-lg text-blue-400'>🛒 NEXTECOM</Link>

    <div className="flex justify-end gap-3">
        <Link href={"/login"} className='text-lg text-blue-400'>LOGIN</Link>
        <Link href={"/register"} className='text-lg text-blue-400'>REGISTER</Link>
    </div>

    </nav>
  )
}

export default Header