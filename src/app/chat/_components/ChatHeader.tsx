'use client'

import React, { useState, useEffect } from 'react';
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
import { getUserEmailAndIds, sendInvitation, getInvitations } from '@/actions/invitation.action';
import { usePathname } from 'next/navigation';

const ChatHeader = () => {
    const linearGradient = "linear-gradient(180deg, #F1F5F9 68.99%, rgba(241, 245, 249, 0.00) 100%);";

    const [showModel, setShowModel] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false)

    const [showInvitationModel, setShowInvitationModel] = useState(false)

    const [invitations, setInvitations] = useState([])

    const [query, setQuery] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const [usersData, setUsersData] = useState([])

    const path = usePathname();


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

    const handleInputChange = (event) => {
        const { value } = event.target;
        setQuery(value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            // handleSearch(value);
            const data = await getUserEmailAndIds({
                email: value
            })
            setUsersData(data.data)
        }, 2000);

        setTimeoutId(newTimeoutId);
    };

    const sendInvitationToUser = async (userId: string) => {
        const data = await sendInvitation({
            chatId: path.split('/')[2],
            invitedUserId: userId
        }).then((data) => {
            alert("Invitation sent")
        }).catch((error) => {
            alert("Invitation already sent")
        })
        console.log(data)
    }

    const openShareModel = () => {
        setShowModel(true);
        setOpenDropdown(false)
    }

    const openInvitationsModel = () => {
        setShowInvitationModel(true);
        setOpenDropdown(false)
    }

    console.log(usersData)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInvitations()
            setInvitations(data?.data)
        }
        fetchData()
    }, [])

    console.log(invitations)


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
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger onClick={openInvitationsModel} inset>Invitations</DropdownMenuSubTrigger>
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
                        <Input placeholder='Invite your friend by email' value={query}
                            onChange={handleInputChange} />
                        <Button>Send Invite</Button>
                    </div>

                    <div className='mt-5'>
                        <p className='font-inter font-medium text-sm text-[#334155]'>Who can access</p>
                        <div className='mt-1'>

                            {usersData && usersData?.map((user) => {
                                return (
                                    <button onClick={() => sendInvitationToUser(user?.id as string)} className='w-full text-left font-medium flex h-fit items-center gap-4 font-inter text-[#334155] text-sm rounded-md p-2 py-1 hover:bg-[#F1F5F9]'>
                                        <Avatar>
                                            <AvatarImage asChild src='' className='rounded-full'>
                                                <Image src='/next.svg' alt='logo' className='rounded-full' width={20} height={20} />
                                            </AvatarImage>
                                            <AvatarFallback>{user?.email.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <p>{user?.email}</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </Model>
            )}


            {showInvitationModel && (
                <Model setShowModel={setShowInvitationModel}>
                    <div className=' w-[400px] h-[200px]'>
                        <p className=' text-xl font-medium'>Invitations</p>

                        <div className=' mt-5'>
                            {invitations && invitations?.map((invitation) => {
                                return (
                                    <div className=' w-full text-left font-medium flex h-fit items-center gap-4 font-inter text-[#334155] text-sm rounded-md p-2 py-1 hover:bg-[#F1F5F9] border justify-between'>
                                        <p>{invitation?.invitedUserId}</p>
                                        <div>
                                            <Button variant="outline" >
                                                Decline
                                            </Button>
                                            <Button className=' ml-2'>
                                                Accept
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </Model>
            )}
        </div>
    );
}

export default ChatHeader;
