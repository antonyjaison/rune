'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Keyboard, LogOut, Plus, Settings, User } from 'lucide-react'
import SidebarCard from './SidebarCard'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'
import Model from '@/components/Model'
import SettingsModel from './SettingsModel'

const Sidebar = () => {
    const [sidebarWidth, setSidebarWidth] = useState(0)
    const [showSidebarSettings, setShowSidebarSettings] = useState(false)
    const [settingsModel, setSettingsModel] = useState(false)

    const divRef = useRef(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            if (divRef.current) {
                setSidebarWidth(divRef.current.offsetWidth);
            }
        });

        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }

        return () => {
            if (divRef.current) {
                resizeObserver.unobserve(divRef.current);
            }
        };
    }, []);

    console.log(sidebarWidth)

    return (
        <div ref={divRef} className='flex flex-col justify-between h-full w-full'>
            <div>
                <div className='p-5'>
                    <Button variant="outline" className='w-full flex gap-3 p-5'>
                        <Plus size={18} />
                        <p className='font-inter text-[#0F172A] font-medium text-sm'>New Chat</p>
                    </Button>
                </div>

                <div className='mt-3'>
                    <p className='pl-5 text-[#0F172A] font-inter font-medium text-base'>Recent chats</p>
                    <ScrollArea className="h-[450px] w-full mt-1">
                        <div className='flex flex-col gap-3 p-5'>
                            <SidebarCard title='hello this is a lorem ipsum' />
                            <SidebarCard title='hello this is a lorem ipsum' />
                            <SidebarCard title='hello this is a lorem ipsum' />
                            <SidebarCard title='hello this is a lorem ipsum' />
                        </div>
                    </ScrollArea>
                </div>
            </div>

            <DropdownMenu open={showSidebarSettings} onOpenChange={setShowSidebarSettings}>
                <DropdownMenuTrigger>
                    <div className={cn(
                        "flex h-fit items-center w-full justify-between p-5 shadow-xl overflow-auto border rounded-md",
                        showSidebarSettings && "rounded-t-none border-t-0"
                    )}>
                        <div className='h-fit flex items-center gap-3'>
                            <Avatar>
                                <AvatarImage className='w-10' src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className='font-[#0F172A] text-sm font-medium'>Ben Dover</p>
                        </div>
                        <Plus onClick={() => setShowSidebarSettings(false)} style={{ rotate: showSidebarSettings ? "45deg" : "0deg", transition: "0.2s" }} className='cursor-pointer ' size={18} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={cn(
                    "absolute top-[-230px] left-[-140px] shadow-transparent",
                    showSidebarSettings && "rounded-b-none"
                )} style={{ width: sidebarWidth }}>

                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSettingsModel(true)}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut color='red' className="mr-2 h-4 w-4" />
                        <span style={{ color: 'red' }}>Logout</span>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            {settingsModel && (
                <div className=' z-50'>
                    <Model setShowModel={setSettingsModel}>
                        <SettingsModel />
                    </Model>
                </div>
            )}

        </div>
    )
}

export default Sidebar
