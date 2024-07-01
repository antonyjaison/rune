'use client'

import React, { useEffect, useState } from 'react'
import { Input } from 'react-chat-elements'
import { MessageCircle, MessageCircleCode, Send } from 'lucide-react'
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
import { ChatOptionsType, ChatSuggestionsType } from '@/lib/types'
import { UploadButton } from '@/utils/uploadthing'
import Flashcard from '@/components/Flashcard'

type TextBoxProps = {
    input: string
    handleInputChange: (e: any) => void
    handleSubmit: () => void,
    setMessages: any
}

const TextBox = ({ input, handleInputChange, handleSubmit, setMessages }: TextBoxProps) => {

    const [showCommands, setShowCommands] = useState(false)

    const [suggestion, setSuggestion] = useState<ChatSuggestionsType>(null)
    const [option, setOption] = useState<ChatOptionsType>(null)

    const [selected, setSelected] = useState<React.ReactElement | null>(null)

    type SuggestionType = {
        id: number
        title: string
        icon: JSX.Element
        color: string
        option: ChatSuggestionsType
    }

    const suggestions: SuggestionType[] = [
        {
            id: 1,
            title: 'Generate notes',
            icon: <Sparkles size={18} className='icon-hover-scale' color='#F8BD00' />,
            color: "#F8BD00",
            option: "generate_notes"
        },
        {
            id: 2,
            title: 'Create flashcards',
            icon: <Sparkles size={18} className='icon-hover-scale' color='#3A78F2' />,
            color: "#3A78F2",
            option: "create_flashcards"
        },
        {
            id: 3,
            title: '“Explain it to me like I’m 5”',
            icon: <Sparkles size={18} className='icon-hover-scale' color='#FF7F50' />,
            color: "#FF7F50",
            option: "explain"
        },
    ]

    useEffect(() => {
        if (input.startsWith('/')) {
            setShowCommands(true)
        } else {
            setShowCommands(false)
        }

        if (option) {
            setShowCommands(false)
        }

        if (suggestion) {
            setShowCommands(false)
        }

        if (input === '') {
            setShowCommands(false)
            setSelected(null)
            setOption(null)
            setSuggestion(null)
        }
    }, [input])

    const handleOptionChange = (option: ChatOptionsType | null) => {
        setOption(option)
        setSuggestion(null)
        setShowCommands(false)
    }

    const handleSuggestionChange = (suggestion: ChatSuggestionsType | null) => {
        setSuggestion(suggestion)
        setOption(null)
        setShowCommands(false)
    }

    useEffect(() => {
        switch (suggestion) {
            case "generate_notes":
                setSelected(<button style={{ boxShadow: "0px 0px 4px 0px #F8BD00" }} className=' text-[#F8BD00] font-inter text-sm font-medium bg-white rounded-md px-3 py-2'>Generate notes</button>)
                break
            case "create_flashcards":
                setSelected(<button style={{ boxShadow: "0px 0px 4px 0px #3A78F2" }} className=' text-[#3A78F2] font-inter text-sm font-medium bg-white rounded-md px-3 py-2'>Create flashcards</button>)
                break
            case "explain":
                setSelected(<button style={{ boxShadow: "0px 0px 4px 0px #FF7F50" }} className=' text-[#FF7F50] font-inter text-sm font-medium bg-white rounded-md px-3 py-2'>“Explain it to me like I’m 5”</button>)
                break
        }
    }, [suggestion])

    useEffect(() => {
        switch (option) {
            case "invite_friends":
                setSelected(<button style={{ boxShadow: "0px 0px 4px 0px #334155" }} className=' text-[#334155] font-inter text-sm font-medium bg-white rounded-md px-3 py-2'>Invite friends</button>)
                break
            case "chat_with_friends":
                setSelected(<button style={{ boxShadow: "0px 0px 4px 0px #334155" }} className=' text-[#334155] font-inter text-sm font-medium bg-white rounded-md px-3 py-2'>Chat with friends</button>)
                break
        }
    }, [option])

    return (
        <div className='w-full flex justify-between h-fit items-center gap-3 px-5'>
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res[0]);
                    setMessages((prev: any) => [{
                        content:"",
                        createdAt: new Date().toISOString(),
                        role:"user",
                        type:"file",
                        fileDetails:{
                            file: res[0].url,
                            name: res[0].name,
                            type: res[0].type
                        }
                    }])
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
            <div className='flex-1'>
                {showCommands && (
                    <div className='w-full px-[1px]'>
                        <Command className='rounded-b-none'>
                            <CommandList>
                                <CommandGroup className='font-inter text-[#334155] text-xl font-medium'>
                                    <p className='font-inter text-[#334155] text-base font-semibold pt-1 pl-1 pb-1'>Options</p>
                                    <CommandItem className='div-hover-scale cursor-pointer'>
                                        <div onClick={() => handleOptionChange("invite_friends")} className='flex h-fit items-center gap-3'>
                                            <UserRoundPlus size={18} className='icon-hover-scale' />
                                            Invite friends
                                        </div>
                                    </CommandItem>
                                    <CommandItem className='div-hover-scale cursor-pointer'>
                                        <div onClick={() => handleOptionChange("chat_with_friends")} className='flex h-fit items-center gap-3'>
                                            <MessageCircle size={18} className='icon-hover-scale' />
                                            Chat with a friends
                                        </div>
                                    </CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup className='font-inter text-[#334155] text-xl font-medium'>
                                    <p className='font-inter text-[#334155] text-base font-semibold pt-1 pl-1 pb-1'>Suggestions</p>
                                    {suggestions.map((suggestion: SuggestionType) => (
                                        <CommandItem key={suggestion.id} className='div-hover-scale cursor-pointer'>
                                            <div onClick={() => handleSuggestionChange(suggestion.option)} style={{ color: suggestion.color }} className='flex h-fit items-center gap-3'>
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

                {selected && (
                    <div className='w-full px-[1px]'>
                        <Command className='rounded-b-none'>
                            <CommandList>
                                <CommandGroup className='font-inter text-[#334155] text-xl font-medium'>
                                    <CommandItem disabled>
                                        {selected}
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                )}

                <Input
                    placeholder="Type your message here..."
                    multiline={true}
                    className={cn('p-3 border border-[#EBEDF0] rounded-md font-inter font-normal text-[#0F172A]',
                        showCommands && "rounded-t-none",
                        selected && "rounded-t-none"
                    )}
                    onChange={handleInputChange}
                    value={input}
                />
            </div>
            <div className='self-end mb-1'>
                <button type='submit' onClick={handleSubmit} aria-label="Send" style={{ background: linearGradient }} className='border-[2.5px] border-[#CBD5E1] rounded-lg p-4'>
                    <Send color='#fff' size={24} />
                </button>
            </div>
            {/* <Flashcard /> */}
        </div>
    )
}

export default TextBox
