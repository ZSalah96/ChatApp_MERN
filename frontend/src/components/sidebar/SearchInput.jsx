import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import useGetConversations from '../../hooks/useGetConversations';
import { setSelectedConversation } from '../../store/conversationSlice';
import { toast } from 'react-hot-toast';

export default function SearchInput() {
    const [search, setSearch] = useState("");
    const { conversations } = useGetConversations();
    const dispatch = useDispatch(); // Add useDispatch hook to get access to dispatch function

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long");
        }

        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            dispatch(setSelectedConversation(conversation)); // Dispatch setSelectedConversation action
            setSearch("");
        } else {
            toast.error("No such user found!");
        }
    };

    return (
        <div className='flex'>
            <form onSubmit={handleSubmit} className='flex items-center gap-1 mobile:ml-4 mobile:py-2'>
                <input
                    type='text'
                    placeholder='Search…'
                    className='input input-bordered rounded-full laptop:w-64 laptop:h-10 tablet:w-44 tablet:h-8 mobile:w-36 mobile:h-8'
                    style={{ color: 'black'}} // Set inline style for text color
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                    <button type='submit' className='btn btn-circle bg-[#62B6B7] text-white hover:bg-[#439A97] mobile:hidden'>
                        <IoSearchSharp className='w-8 h-6 outline-none mobile:w-0' />
                    </button>
            </form>
          
        </div>
    );
}
