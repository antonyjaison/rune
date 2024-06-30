import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserTextProps = {
    message: string
}

const UserText = ({ message }: UserTextProps) => {
    return (
        <div className=' w-full flex h-fit items-start gap-5 px-10 pr-16'>
            <div className='bg-[#CBD5E1] p-5 rounded-md rounded-tr-none flex-1'>
                <p className='font-inter text-sm text-[#111]'>{message}</p>
            </div>

            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>
    )
}

export default UserText