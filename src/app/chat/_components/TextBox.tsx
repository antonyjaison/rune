'use client'

import React, { useEffect, useState } from 'react'
import { Input } from 'react-chat-elements'
import { Send } from 'lucide-react'
import { linearGradient } from '@/lib/constants'
import "react-chat-elements/dist/main.css"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { cn } from '@/lib/utils'
import { UserRoundPlus, Sparkles } from 'lucide-react'

const TextBox = () => {
    const [inputText, setInputText] = useState('')
    const [showCommands, setShowCommands] = useState(false)

    const suggestions = [
        {
            id: 1,
            title: 'Generate notes',
            icon: <Sparkles size={18} color='#F8BD00' />,
            color: "#F8BD00"
        },
        {
            id: 2,
            title: 'Create flashcards',
            icon: <Sparkles size={18} color='#3A78F2' />,
            color: "#3A78F2"
        },
        {
            id: 3,
            title: '“Explain it to me like I’m 5”',
            icon: <Sparkles size={18} color='#FF7F50' />,
            color: "#FF7F50"
        },
    ]

    useEffect(() => {
        if (inputText.startsWith('/')) {
            setShowCommands(true)
        } else {
            setShowCommands(false)
        }
    }, [inputText])

    return (
        <div className='w-full flex justify-between h-fit items-center gap-3 px-5'>
            <div className='flex-1'>
                {showCommands && (
                    <div className='w-full px-[1px]'>
                        <Command className='rounded-b-none'>
                            <CommandList>
                                <CommandGroup className='font-inter text-[#334155] text-xl font-medium'>
                                    <p className='font-inter text-[#334155] text-base font-semibold pt-1 pl-1 pb-1'>Functions</p>
                                    <CommandItem>
                                        <div className='flex h-fit items-center gap-3'>
                                            <UserRoundPlus size={18} />
                                            Invite friends
                                        </div>
                                    </CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup className='font-inter text-[#334155] text-xl font-medium'>
                                    <p className='font-inter text-[#334155] text-base font-semibold pt-1 pl-1 pb-1'>Suggestions</p>
                                    {suggestions.map((suggestion) => (
                                        <CommandItem key={suggestion.id}>
                                            <div style={{ color: suggestion.color }} className='flex h-fit items-center gap-3'>
                                                {suggestion.icon}
                                                {suggestion.title}
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                )}
                <Input
                    placeholder="Type your message here..."
                    multiline={true}
                    className={cn('p-3 border border-[#EBEDF0] rounded-md font-inter font-normal text-[#0F172A]',
                        showCommands && "rounded-t-none"
                    )}
                    value={inputText}
                    onChange={(e: any) => setInputText(e.target.value)}
                />
            </div>
            <div className='self-end mb-1'>
                <button aria-label="Send" style={{ background: linearGradient }} className='border-[2.5px] border-[#CBD5E1] rounded-lg p-4'>
                    <Send color='#fff' size={24} />
                </button>
            </div>
        </div>
    )
}

export default TextBox
