import React from 'react'
import TextBox from './_components/TextBox'
import InitialChat from './_components/InitialChat'
import ChatSection from './_components/ChatSection'

const ChatPage = () => {
  return (
    <div className=' ml-5 h-full'>

      <div className=' h-3/4 flex justify-center items-center'>
        {/* <InitialChat/> */}
        <ChatSection/>
      </div>

      <div className='h-1/4 flex flex-col gap-8 items-center justify-end'>
        <TextBox/>
        <p className=' text-[#7D7D7D] font-inter text-sm font-normal'>Free development preview. Rune may produce inaccurate information about people, places or facts.</p>
      </div>
    </div>
  )
}

export default ChatPage