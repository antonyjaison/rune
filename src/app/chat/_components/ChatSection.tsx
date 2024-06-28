import React from 'react'
import ChatHeader from './ChatHeader'
import RuneResponse from './RuneResponse'
import UserText from './UserText'

const ChatSection = () => {
  return (
    <div className=' w-full h-full'>
      <div className=' fixed w-4/5'>
        <ChatHeader />
      </div>

      <div className=' z-0 w-full h-full overflow-y-auto'>
        <div className=' mt-[140px] flex flex-col gap-8'>
          <UserText/>
          <RuneResponse />
          <UserText/>
          <RuneResponse />
          <UserText/>
          <RuneResponse />
        </div>
      </div>

    </div>
  )
}

export default ChatSection