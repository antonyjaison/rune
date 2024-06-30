import React from 'react'
import { FileText } from 'lucide-react'
import Link from 'next/link'

type UploadedFileProps = {
  fileDetails:{
    name: string
    type: string
    file: string
  }
}

const UploadedFile = ({ fileDetails }: UploadedFileProps) => {
  return (
    <Link href={fileDetails.file}>
      <div className='w-full flex justify-between'>
        <div />
        <div className=' h-fit flex items-center gap-3 border-2 border-gray-300 rounded-md p-2 w-72 bg-white mr-16'>
          <div className=' bg-pink-500 rounded-md p-2 w-fit'>
            <FileText color='white' size={32} />
          </div>
          <div>
            <p className=' text-black'>{fileDetails.name}</p>
            <p className=' text-gray-500'>{fileDetails.type.split("/")[1]}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UploadedFile