import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu, Plus } from 'lucide-react'
import SidebarCard from './SidebarCard'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"


const Sidebar = () => {
    return (
        <div className=' flex flex-col justify-between h-full'>
            <div>
                <div className='p-5'>
                    <Button variant="outline" className=' w-full flex gap-3 p-5'>
                        <Plus size={18} />
                        <p className=' font-inter text-[#0F172A] font-medium text-sm'>New Chat</p>
                    </Button>
                </div>


                <div className='mt-3'>
                    <p className='pl-5 text-[#0F172A] font-inter font-medium text-base'>Recent chats</p>
                    <ScrollArea className="h-[450px] w-full mt-1">
                        <div className=' flex flex-col gap-3 p-5'>
                            <SidebarCard title='hello this is a lorem ipsum' />
                            <SidebarCard title='hello this is a lorem ipsum' />
                            <SidebarCard title='hello this is a lorem ipsum' />
                            <SidebarCard title='hello this is a lorem ipsum' />
                        </div>
                    </ScrollArea>
                </div>
            </div>

            <div className=' flex h-fit items-center w-full justify-between p-5'>

                <div className=' h-fit flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage className=' w-10' src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className=' font-[#0F172A] text-sm font-medium'>Ben Dover</p>
                </div>
                <Menu className=' cursor-pointer' size={18} />
            </div>

        </div>
    )
}

export default Sidebar