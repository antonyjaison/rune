import React from 'react'
import { Separator } from "@/components/ui/separator"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { AudioLines, Keyboard, LogOut, Palette, Settings, User } from 'lucide-react'
import Image from 'next/image'



const SettingsModel = () => {
    return (
        <div className=' flex h-[400px]  p-6 text-sm'>
            <div className=' h-full flex flex-col justify-between'>
                <div>
                    <p className=' font-inter font-semibold text-lg text-[#334155]'>Settings</p>
                    <div>
                        <Command>
                            <CommandList>
                                <CommandGroup>
                                    <CommandItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>General</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <Palette className="mr-2 h-4 w-4" />
                                        <span>Appearence</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <AudioLines className="mr-2 h-4 w-4" />
                                        <span>Speech</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <Keyboard className="mr-2 h-4 w-4" />
                                        <span>Keyboard Shortcut</span>
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                </div>
                <button className=' flex h-fit items-center ml-1 hover:bg-[#F1F5F9] rounded-md px-1 py-2'>
                    <LogOut color='red' className="mr-2 h-4 w-4" />
                    <span style={{ color: 'red' }}>Logout</span>
                </button>

            </div>
            <Separator className='ml-4' orientation='vertical' />
            <div className='px-5 w-[500px]'>
                <p className=' font-inter font-semibold text-xl text-[#334155]'>Settings</p>
                <div className='py-2'>
                    <Separator />
                </div>

                <div className=' w-full mt-5'>
                    <p className=' font-inter text-sm font-medium text-[#334155]'>Theme</p>
                    <p className='font-inter text-[10px] text-[#B5B5B5]'>Customise your UI theme</p>

                    <div className=' w-[500px] flex justify-between mt-6'>
                        <div>
                            <Image src="/images/light.png" width={170} height={120} alt='light'/>
                            <p className='font-inter text-xs font-medium text-[#334155] mt-3'>Light theme</p>
                        </div>
                        <div>
                            <Image src="/images/dark.png" width={170} height={120} alt='light'/>
                            <p className='font-inter text-xs font-medium text-[#334155] mt-3'>Light theme</p>
                        </div>
                        <div>
                            <Image src="/images/system.png" width={170} height={120} alt='light'/>
                            <p className='font-inter text-xs font-medium text-[#334155] mt-3'>Light theme</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsModel