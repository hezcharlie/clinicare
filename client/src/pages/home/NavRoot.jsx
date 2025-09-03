import React from 'react'
import { Link, NavLink } from 'react-router'

export default function NavBar() {
  return (
    <div className='hidden md:flex justify-between items-center md:space-x-6 lg:space-x-28'>
        <Link  to="/"
  className={({ isActive,}) =>
    isActive ? " text-blue-500" : "text-zinc-600 hover:text-blue-600 transition"
  }>Features</Link> 
        <Link  to="#how-it-works"
  className= " text-zinc-600 hover:text-blue-600 transition"
  >How it works</Link>
        <Link
  to="/contact"
  className=" text-zinc-600 hover:text-blue-600 transition"
 
>
  Contact Us
</Link>
    </div>
  )
}
