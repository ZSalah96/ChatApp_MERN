import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import GenderCheckbox from '../../components/genderCheckbox/GenderCheckbox';
import useSignup from '../../hooks/useSignup';


export default function SignUp() {
  const [inputs, setInputs] = useState({
    fullName : '',
    username : '',
    password : '',
    confirmPassword : '',
    gender: "",

  });


  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }
  return (
    <div>
        
      <div className="bg-white py-6">
        <div className="mx-auto max-w-screen-2xl px-4 ">
        <div className='flex justify-center items-center'>
            <h1 className=" mr-2 text-center text-2xl font-bold text-[#439A97]">Let's Talk</h1>
            <img src="/Hablar_logo.png" className="w-16 h-auto" alt="Hablar Logo" />
        </div>
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">Sign Up</h2>

            <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 p-4">
                    <div>
                        <label type="fullname" className="mb-2 inline-block text-sm text-gray-800">Full Name</label>
                        <input type="fullname" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        value={inputs.fullName}
                        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
                    </div>

                    <div>
                        <label type="username" className="mb-2 inline-block text-sm text-gray-800">Username</label>
                        <input type="username" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" 
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>
                    </div>
                    <div>
                        <label type="password" className="mb-2 inline-block text-sm text-gray-800 ">Password</label>
                        <input name="password" type="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" 
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
                    </div>
                    <div>
                        <label  className="mb-2 inline-block text-sm text-gray-800 ">Confirm Password</label>
                        <input name="password" type="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}/>
                    </div>
                    <div>
                      <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
                    </div>

                    <button className="block rounded-lg bg-[#62B6B7] px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-[#439A97] focus-visible:ring active:bg-gray-600" disabled={loading}>
				            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}</button>
        
      </div>

      <div class="flex items-center justify-center bg-gray-100 p-4">
        <p class="text-center text-sm text-gray-500">Already have an account? 
        <Link to="/login" class="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Login</Link></p>
      </div>
    </form>
  </div>
</div>
    </div>
  )
}
