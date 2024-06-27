'use client'

import React from 'react'
import { Input } from 'react-chat-elements'
import { Send } from 'lucide-react'
import { linearGradient } from '@/lib/constants'
import "react-chat-elements/dist/main.css"


const TextBox = () => {
    return (
        <div className=' w-full flex justify-between h-fit items-center gap-3 px-5'>
            <div className=' flex-1'>
                <Input
                    placeholder="Type your message here..."
                    multiline={true}
                    className='p-3 border border-[#EBEDF0] rounded-md font-inter font-normal text-[#0F172A]'
                />
            </div>
            <div className=' self-end mb-1'>
                <button style={{ background: linearGradient }} className=' border-[2.5px] border-[#CBD5E1] rounded-lg p-4'>
                    <Send color='#fff' size={24} />
                </button>
            </div>
        </div>
    )
}

export default TextBox