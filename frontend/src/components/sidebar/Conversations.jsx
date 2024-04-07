import React from 'react'
import Conversation from './Conversation'
import { useGetConversations } from '../../hooks/useGetConversations'

const Conversations = () => {
  const {loading,conversations}=useGetConversations();
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation,index)=>(
        <Conversation key={conversation._id}
          conversation={conversation}
          lastInd={index===conversations.length-1}
        />
      ))}
      {loading?<span className='loading loading-spinner'></span>:null}

    </div>
  )
}

export default Conversations