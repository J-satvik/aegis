import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("assets/off.png")) {
      ref.current.src = "assets/on.png";
      passwordRef.current.type = "password";
    }
    else {
      passwordRef.current.type = "text";
      ref.current.src = "assets/off.png";
    }
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    console.log([...passwordArray, form])
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="mycontainer">
        <h1 className=' text-white text-4xl text-center font-bold'>Aegis</h1>
        <p className=' text-white text-lg text-center'>Your Password Manager</p>
        <div className="text-white flex flex-col p-4 gap-6 items-center">
          <input value={form.site} onChange={handleChange} name='site' type="text" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Website URI' />
          <div className="flex w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} name='username' type="text" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' type="password" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Password' />
              <span className='absolute right-[3px] top-[7px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} src="assets/on.png" alt="on" width={28} className='p-1' />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center items-center w-fit rounded-lg border border-solid border-white px-2 py-2 gap-2 hover:bg-sky-950'>
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
              colors="primary:#ffffff">
            </lord-icon>
            Add Password!
          </button>
        </div>
        <div className="passwords text-white ">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show &#58; &#40;</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden ">
              <thead className='bg-[#131b2e]'>
                <tr>
                  <th className='py-2 border-b border-slate-600'>URI</th>
                  <th className='py-2 border-b border-slate-600'>Username</th>
                  <th className='py-2 border-b border-slate-600'>Password</th>
                </tr>
              </thead>
              <tbody className='bg-[#1e293b]'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='justify-center text-center  py-1.5  border-b border-slate-600'>
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <img className='iconcopy invert cursor-pointer w-7 h-7 px-2' src="/assets/copy.svg" alt="copy" onClick={() => { copyText(item.site) }} />
                      </div>
                    </td>

                    <td className='text-center  py-1.5  border-b border-slate-600'>
                      <div className='flex items-center justify-center'>
                        <span>{item.username}</span><img className='iconcopy invert cursor-pointer w-7 h-7 px-2' src="/assets/copy.svg" alt="copy" onClick={() => { copyText(item.username) }} />
                      </div>
                    </td>
                    <td className='text-center  py-1.5  border-b border-slate-600'>
                      <div className='flex items-center justify-center'>
                        <span>{item.password}</span><img className='iconcopy invert cursor-pointer w-7 h-7 px-2' src="/assets/copy.svg" alt="copy" onClick={() => { copyText(item.password) }} />
                      </div>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
