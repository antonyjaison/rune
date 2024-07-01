import React, { ReactNode, useEffect, useState } from 'react'
import Model from './Model'
import { linearGradient } from '@/lib/constants'

type FlashCardStates = "creating" | "loading" | "show" | "answer"


const Flashcard = () => {
    const [show, setShow] = useState(true)
    const [flashCardContent, setFlashCardContent] = useState<ReactNode>(<></>)
    const [flashCardState, setFlashCardState] = useState<FlashCardStates>("answer")

    useEffect(() => {

        switch (flashCardState) {
            case "creating":
                setFlashCardContent(<p className=' text-white font-inter text-4xl font-light'>Creating Flashcards...</p>)
                break;
            case "loading":
                setFlashCardContent(
                    <div className=''>
                        <p className=' text-white font-inter text-4xl font-light'>First card in</p>
                        <p className=' text-white font-inter text-4xl font-light text-center'>3</p>
                    </div>
                )
            case "show":
                setFlashCardContent(
                    <div className=' w-full h-full bg-white flex justify-between flex-col p-8'>
                        <div>
                            <p className=' text-[#334155] font-inter text-3xl'>Question 1</p>
                            <p className=' text-[#334155] font-inter text-4xl font-semibold mt-11'>What is the fundamental unit of light?</p>
                        </div>
                        <p className=' text-[#334155] font-inter font-medium text-5xl text-center'>3</p>
                        <div />
                    </div>
                )
            case "answer":
                setFlashCardContent(<p className=' text-white font-inter text-5xl font-medium'>Photon</p>)

            default:
                break;
        }
    }, [])


    return (
        <div>
            {show && (
                <Model setShowModel={setShow} >
                    <div style={{ background: linearGradient }} className=' w-[800px] h-[350px] rounded-md flex justify-center items-center'>
                        {flashCardContent}
                    </div>
                </Model>
            )}
        </div>
    )
}

export default Flashcard