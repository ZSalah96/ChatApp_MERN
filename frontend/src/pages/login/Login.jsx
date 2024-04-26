import React from 'react';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import useLogin from '../../hooks/useLogin';


export default function Login() {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

  return (
    <div>
 
     
 <div className="bg-white py-6">
  <div className="mx-auto max-w-screen-2xl px-4">
    <div className='flex justify-center items-center'>
            <h1 className=" mr-2 text-center text-2xl font-bold text-[#439A97]">Let's Talk</h1>
            <img src="/Hablar_logo.png" className="w-16 h-auto" alt="Hablar Logo" />
    </div>
    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">Login</h2>

    <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 p-4 ">
        <div>
          <label  className="mb-2 inline-block text-sm text-gray-800">Username</label>
          <input type="username" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label className="mb-2 inline-block text-sm text-gray-800 ">Password</label>
          <input name="password" type="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="block rounded-lg bg-[#62B6B7] px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-[#439A97] focus-visible:ring active:bg-gray-600">Login</button>

        

        
      </div>

      <div className="flex items-center justify-center bg-gray-100 p-4">
        <p className="text-center text-sm text-gray-500">Don't have an account?  
        <Link to={"/signup"} className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</Link></p>
      </div>
    </form>
  </div>
</div>
       
    </div>
  );
}
