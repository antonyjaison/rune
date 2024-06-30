import React, { useRef, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import RuneResponse from './RuneResponse'
import UserText from './UserText'
import UploadedFile from './UploadedFile'

type ChatSectionProps = {
  messages: any
}

const ChatSection = ({ messages }: ChatSectionProps) => {

  const chatParent = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const domNode = chatParent.current
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  })

  return (
    <div className=' w-full h-full'>
      <div className=' fixed w-4/5'>
        <ChatHeader />
      </div>

      <div ref={chatParent} className=' z-0 w-full h-full overflow-y-auto chat_section'>
        <div className=' mt-[140px] flex flex-col gap-8'>
          {messages.map((message, index) => {
            if (message.role === 'user') {
              return message.type === "file" ? <UploadedFile fileDetails={message.fileDetails} /> : <UserText key={index} message={message.content} />
            } else {
              return <RuneResponse key={index} message={message.content} />
            }
          })}
        </div>
      </div>

    </div>
  )
}

export default ChatSection