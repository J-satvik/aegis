import React from 'react'
import { useRef } from 'react'

const Manager = () => {
    const ref = useRef()
    const showPassword = () => {
      alert("password");
      if(ref.current.src.includes("assets/off.png")){
        ref.current.src = "assets/on.png";
      }
      else{
        ref.current.src = "assets/off.png";
      }
      
    }
    
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="mycontainer">
                <h1 className=' text-white text-4xl text-center font-bold'>Aegis</h1>
                <p className=' text-white text-lg text-center'>Your Password Manager</p>
                <div className="text-white flex flex-col p-4 gap-6 items-center">
                    <input type="text" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Website URI' />
                    <div className="flex w-full justify-between gap-8">
                        <input type="text" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Username' />
                        <div className="relative">
                            <input type="text" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Password' />
                            <span className='absolute right-[3px] top-[7px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="assets/on.png" alt="on" width={28}className='p-1' />
                            </span>
                        </div>
                    </div>

                    <button className='flex justify-center items-center w-fit rounded-lg border border-solid border-white px-2 py-2 gap-2 hover:bg-sky-950'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                        </lord-icon>
                        Add Password!
                    </button>
                </div>
            </div>
        </>
    )
}

export default Manager
