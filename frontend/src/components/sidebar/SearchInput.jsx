import React, { useState } from 'react'
import {IoSearchSharp} from 'react-icons/io5'
import useConversation from '../../../zustand/useConversation';
import { useGetConversations } from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {
  const [search,setSearch]=useState("");
  const {setSelectedConversation}=useConversation();
  const {conversations}=useGetConversations();
  const handleSearch=(e)=>{
    e.preventDefault();
    if(!search){
      return;
    }
    if(search.length<2){
      return toast.error("Search item must be of length >2");
    }
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
  }
  return (
    <div>
        <form className='flex items-center gap-2' onSubmit={handleSearch}>
            <input type='text' 
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search for someone' className='input input-bordered rounded-full'/>
            <button type='submit' className='btn btn-circle'>
                <IoSearchSharp className='w-6 h-6 outline-none'/>
            </button>
        </form>
    </div>
  )
}

export default SearchInput