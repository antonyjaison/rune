import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className=' flex h-fit items-center gap-2'>
        <Image src='/rune.svg' width={31} height={27} alt='rune'/>
        <h1 className=' text-4xl font-light font-poppins'>Rune</h1>
    </div>
  )
}

export default Logo