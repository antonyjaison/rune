import React from 'react'
import { Ellipsis } from 'lucide-react'
import Collaborator from './Collaborator'
import { CollaboratorType } from '@/lib/types'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
    DropdownMenuCheckboxItem,
    DropdownMenuSubTrigger,
    DropdownMenuSub
} from "@/components/ui/dropdown-menu"

const ChatHeader = () => {
    const linearGradient = "linear-gradient(180deg, #F1F5F9 68.99%, rgba(241, 245, 249, 0.00) 100%);"

    const collaborators: CollaboratorType[] = [
        {
            id: "1",
            name: "John Doe",
            avatar: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        },
        {
            id: "2",
            name: "Smith",
            avatar: "https://avatar.iran.liara.run/public/boy?username=Ash",
        },
        {
            id: "3",
            name: "Antony",
            avatar: "https://github.com/shadcn.png",
        },
        {
            id: "4",
            name: "Ashik Baiju",
            avatar: "https://avatar.iran.liara.run/public/boy?username=Ash",
        },
    ]

    return (
        <div style={{ background: linearGradient }} className=' w-full h-[140px] px-5 '>
            <div className='flex justify-between h-fit items-center'>
                <div className=' flex h-fit items-center gap-10'>
                    <h1 className=' font-inter text-2xl text-[#0F172A] font-medium'>Convolutional Neural Networks</h1>
                    <Collaborator collaborators={collaborators} />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis size={25} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=' mr-8 w-64'>
                        <DropdownMenuItem inset>
                            Reload
                            <DropdownMenuShortcut>Ctrl + R</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger inset>Invite friends</DropdownMenuSubTrigger>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                            Pin note
                            <DropdownMenuShortcut>Ctrl + B</DropdownMenuShortcut>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel inset>People</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem inset>Smith</DropdownMenuItem>
                        <DropdownMenuItem inset>John</DropdownMenuItem>
                        <DropdownMenuItem inset>Ashiq</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default ChatHeader