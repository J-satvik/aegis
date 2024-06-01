import React from 'react'

const Navbar = () => {
  return (
    <nav className=' text-white text-lg'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 ">
        <div className="logo font-bold">
          Aegis
        </div>
        {/* <ul>
          <li className='flex gap-4'>
              <a className='hover:font-bold' href="/">Home</a>
              <a className='hover:font-bold' href="#">About</a>
              <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul> */}
        <button className='text-base text-gray-400 my-4 rounded-full flex justify-between items-center bg-gray-800 border border-gray-600  hover:text-white' onClick={() => window.location.href = 'https://github.com/sam-sampreeth/aegis'}>
          <img className='invert w-10 p-1' src="/assets/github.png" alt="GitHub" />
          <span className='font-medium px-2'>GitHub</span>
          
        </button>
      </div>
    </nav>
  )
}

export default Navbar
