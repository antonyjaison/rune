'use client'

import React from 'react'
import TextBox from './_components/TextBox'
import InitialChat from './_components/InitialChat'
import ChatSection from './_components/ChatSection'
import { useChat } from 'ai/react'
import UploadedFile from './_components/UploadedFile'
import { createChat } from "@/actions/chat.action";

const ChatPage = () => {
  const { messages, input, handleInputChange, setMessages } = useChat();
  console.log(messages)

  const handleSubmit = async () => {
    const res = await createChat({
      message: input,
    });
  };
  return (
    <div className=' ml-5 h-full'>

      <div className=' h-3/4 flex justify-center items-center'>
        {messages.length > 0 ? (
          <ChatSection messages={messages} />
        ) : (
            <InitialChat />
        )}
      </div>

      <div className='h-1/4 flex flex-col gap-8 items-center justify-end'>
        <TextBox setMessages={setMessages} input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        <p className=' text-[#7D7D7D] font-inter text-sm font-normal'>Free development preview. Rune may produce inaccurate information about people, places or facts.</p>
      </div>
    </div>
  )
}

export default ChatPage