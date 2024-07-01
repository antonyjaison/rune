'use client'

import React, { useEffect } from 'react'
import TextBox from '../_components/TextBox'
import InitialChat from '../_components/InitialChat'
import ChatSection from '../_components/ChatSection'
import { useChat } from 'ai/react'
import UploadedFile from '../_components/UploadedFile'
import { ChatDetails } from '@/lib/types'

type IndividualChatPageProps = {
  chatDetails: ChatDetails | null;
};

export const IndividualChatPage = ({
  chatDetails,
}: IndividualChatPageProps) => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      initialMessages: chatDetails?.messages as any,
    });
  console.log(chatDetails?.messages);

  console.log(messages);

  return (
    <div className=" ml-5 h-full">
      <div className=" h-3/4 flex justify-center items-center">
        <ChatSection messages={messages} />
      </div>

      <div className="h-1/4 flex flex-col gap-8 items-center justify-end">
        <TextBox
          setMessages={setMessages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <p className=" text-[#7D7D7D] font-inter text-sm font-normal">
          Free development preview. Rune may produce inaccurate information
          about people, places or facts.
        </p>
      </div>
    </div>
  );
};

