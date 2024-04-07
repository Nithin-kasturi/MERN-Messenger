import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages.js'
import MessageSkeleton from '../../skeletons/MessageSkeleton.jsx';
import useListenMessages from '../../hooks/useListenMessage.js';

const Messages = () => {
const {loading,messages}=useGetMessages();
useListenMessages();
const lastMessageRef = useRef();
console.log(messages);
useEffect(() => {
	setTimeout(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, 100);
}, [messages]);
return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
        {  loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {!loading && messages.length === 0 && (
				<p className='text-center'>Dont let ego win! start a conversation </p>
			)}
    </div>

  )
}

export default Messages