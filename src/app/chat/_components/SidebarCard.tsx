'use client'

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { EllipsisVertical, Share, Trash, Pen, Archive } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SidebarCardProps = {
    title: string;
}

const SidebarCard = ({ title }: SidebarCardProps) => {
    const [hover, setHover] = useState(false);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const truncatedTitle = truncateText(title, 19);

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex items-center justify-between w-full border border-[#EBEDF0] pl-5 pr-1 py-2 rounded-md">
                <div
                    className='w-full font-inter font-medium text-[#0F172A] cursor-pointer'
                >
                    <p className='font-inter font-medium text-[#0F172A] text-sm cursor-pointer'>
                        {truncatedTitle}
                    </p>
                </div>
                <div className={`flex space-x-2 transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className='p-1'>
                                <EllipsisVertical onClick={() => setHover(true)} size={18} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log("Share clicked")} className='cursor-pointer'>
                                <div className='flex h-fit items-center justify-center gap-3'>
                                    <Share size={18} />
                                    Share
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log("Rename clicked")} className='cursor-pointer'>
                                <div className='flex h-fit items-center justify-center gap-3'>
                                    <Pen size={18} />
                                    Rename
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log("Archive clicked")} className='cursor-pointer'>
                                <div className='flex h-fit items-center justify-center gap-3'>
                                    <Archive size={18} />
                                    Archive
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log("Delete clicked")} className='cursor-pointer' style={{ color: 'red' }}>
                                <div className='flex h-fit items-center justify-center gap-3'>
                                    <Trash size={18} color='red' />
                                    Delete
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default SidebarCard;
