import React from 'react'
import Sidebar from './_components/Sidebar';

const ChatLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=' w-full h-screen bg-[#F1F5F9] flex flex-row p-5'>
            <div className=' border border-[#E2E8F0] rounded-md bg-white w-1/6'>
                <Sidebar/>
            </div>
            <div className=' w-5/6'>
                {children}
            </div>
        </div>
    )
}

export default ChatLayout