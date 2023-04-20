import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <nav className='header'>
        <Link href="/">
            <Image src="/img/logo.png" alt='' width={52} height={61}/>
        </Link>
        <div className='nav-menu'>
            <Link href="#about">ABOUT</Link>
            <Link href="#work">WORK</Link>
            <Link href="#message">MESSAGE</Link>
        </div>
    </nav>
  )
}

export default Header