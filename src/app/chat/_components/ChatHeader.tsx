'use client'

import React, { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import Collaborator from './Collaborator';
import { CollaboratorType } from '@/lib/types';
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
} from "@/components/ui/dropdown-menu";
import Model from '@/components/Model';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';

const ChatHeader = () => {
    const linearGradient = "linear-gradient(180deg, #F1F5F9 68.99%, rgba(241, 245, 249, 0.00) 100%);";

    const [showModel, setShowModel] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false)

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
    ];

    const openShareModel = () => {
        setShowModel(true);
        setOpenDropdown(false)
    }

    return (
        <div style={{ background: linearGradient }} className='w-full h-[140px] px-5 z-20 pt-5'>
            <div className='flex justify-between h-fit items-center'>
                <div className='flex h-fit items-center gap-10'>
                    <h1 className='font-inter text-2xl text-[#0F172A] font-medium'>Convolutional Neural Networks</h1>
                    <Collaborator collaborators={collaborators} />
                </div>

                <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                    <DropdownMenuTrigger className='mr-10'>
                        <Ellipsis size={25} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-8 w-64'>
                        <DropdownMenuItem inset>
                            Reload
                            <DropdownMenuShortcut>Ctrl + R</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger onClick={openShareModel} inset>Invite friends</DropdownMenuSubTrigger>
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

            {showModel && (
                <Model setShowModel={setShowModel}>
                    <p className='mb-3 font-inter text-xl font-semibold text-[#334155]'>Share this file</p>
                    <div className='h-fit flex items-center gap-4'>
                        <Input placeholder='Invite your friend by email' />
                        <Button>Send Invite</Button>
                    </div>

                    <div className='mt-5'>
                        <p className='font-inter font-medium text-sm text-[#334155]'>Who can access</p>
                        <div className='mt-1'>
                            <button className='w-full text-left font-medium font-inter text-[#334155] text-sm rounded-md p-2 py-1 hover:bg-[#F1F5F9]'>
                                <Avatar>
                                    <AvatarImage asChild src='/next.svg' className='rounded-full'>
                                        <Image src='/next.svg' alt='logo' className='rounded-full' width={20} height={20} />
                                    </AvatarImage>
                                    <AvatarFallback>AN</AvatarFallback>
                                </Avatar>
                            </button>
                        </div>
                    </div>
                </Model>
            )}
        </div>
    );
}

export default ChatHeader;
