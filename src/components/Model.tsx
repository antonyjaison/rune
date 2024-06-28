import React from 'react';

type ModelProps = {
  children: React.ReactNode,
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>
}

const Model = ({ children, setShowModel }: ModelProps) => {
  return (
    <div
      onClick={() => setShowModel(false)}
      className='w-full h-screen fixed top-0 left-0 bg-[#00000087] flex justify-center items-center'
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking inside it
        className='bg-white border border-[#CBD5E1] rounded-md p-3'
      >
        {children}
      </div>
    </div>
  );
}

export default Model;
