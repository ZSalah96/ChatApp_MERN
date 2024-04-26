import { BsSend } from "react-icons/bs";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage.js";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage(""); // Move this line inside the sendMessage function to ensure it's reset after sending the message
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg border-gray-600 text-black'
          placeholder='Send a message'
          value={message} // Add value prop to bind input field to message state
          onChange={(e) => setMessage(e.target.value)} // Add onChange event to update message state
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {loading ? <div className='loading loading-spinner'></div> : <BsSend className="text-black" />}
        </button>
      </div>
    </form>
  );
}
