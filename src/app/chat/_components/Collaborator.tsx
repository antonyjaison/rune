import { CollaboratorType } from '@/lib/types'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'


type CollaboratorProps = {
  collaborators: CollaboratorType[]
}

const Collaborator = ({ collaborators }: CollaboratorProps) => {

  const totalCollaborators = collaborators.length

  return (
    <div className='relative w-fit h-fit items-center flex border-2 border-[#EBEDF0] px-2 py-1 bg-[#F1F5F9] rounded-md rounded-tr-none'>
      {collaborators.slice(0, 2).map((collaborator, index) => {
        return (
          <div key={collaborator.id} className={cn(
            "cursor-pointer hover:opacity-80",
            index !== 0 && 'ml-[-12px]'
          )}>
            <Avatar>
              <AvatarImage src={collaborator.avatar} />
              <AvatarFallback>{collaborator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        )
      })}
      {totalCollaborators > 3 && (
        <div className='ml-[-12px] cursor-pointer'>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className=' bg-[#C7C7C7] font-inter text-white text-xs'>+{totalCollaborators - 2}</AvatarFallback>
          </Avatar>
        </div>
      )}
      <button className='ml-2'>
        <ChevronDown size={20} />
      </button>
      <div className='w-3 h-3 rounded-full bg-[#E33629] absolute top-[-6px] right-[-6px]' />
    </div>
  )
}

export default Collaborator