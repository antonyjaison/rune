import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { linearGradient } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

const InitialChat = () => {

    return (
        <div className=' w-2/3 h-fit rounded-md shadow-lg bg-white border border-[#E2E8F0] p-6'>
            <div style={{ background: linearGradient }} className=' w-full h-[270px] rounded-md flex justify-center items-center'>
                <div className=' flex flex-row h-fit items-center gap-4'>
                    <Image src="/svg/logo_white.svg" alt='rune' width={47} height={41} />
                    <p className=' text-white font-poppins text-6xl font-light'>Rune</p>
                </div>
            </div>
            <div className='h-1/4 w-full mt-4'>
                <p className=' font-inter font-medium text-base text-[#0F172A]'>Examples</p>
                <div className=' grid grid-cols-3 gap-3 mt-3'>
                    <p className='font-inter text-base font-medium text-[#111] border px-4 py-2 rounded-md border-[#EBEDF0] cursor-pointer hover:bg-slate-100'>
                        Explain the difference between mitosis and meiosis in simple terms.
                    </p>
                    <p className='font-inter text-base font-medium text-[#111] border px-4 py-2 rounded-md border-[#EBEDF0] cursor-pointer hover:bg-slate-100'>
                        What are the main arguments for and against universal basic income?
                    </p>
                    <p className='font-inter text-base font-medium text-[#111] border px-4 py-2 rounded-md border-[#EBEDF0] cursor-pointer hover:bg-slate-100'>
                        Explain the difference between mitosis and meiosis in simple terms.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InitialChat