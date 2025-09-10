import React from 'react'
import loadingIcon from '@/assets/images/loadingIcon.svg'

export const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-white bg-opacity-80'>
        <img src={loadingIcon} width={100} alt="Loading..." />
    </div>
  )
}

export default Loading