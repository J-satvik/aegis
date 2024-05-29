import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPass = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(passwords);
    console.log(passwords)
  }
  
  useEffect(() => {
    try {
      getPass();
      
    } catch (error) {
      console.error("Failed to parse passwords from localStorage:", error);
      localStorage.removeItem("passwords");
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
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
  }

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "assets/off.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "assets/on.png";
    }
  };

  const savePassword = async () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length >3){

      await fetch("http://localhost:3000/", {method: "DELETE", headers:{"Content-type": "application/json"}, body:JSON.stringify({ id: form.id}) })

      const newPassword = { ...form, id: uuidv4() };
      const updatedPasswordArray = [...passwordArray, newPassword];
      setPasswordArray(updatedPasswordArray);
      await fetch("http://localhost:3000/",{method: "POST", headers: {"Content-type": "application/json" }, body:JSON.stringify({...form, id: uuidv4()})})
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
      setForm({ site: "", username: "", password: "" });
    } else {
      toast("Password not saved :( ");
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Really want to delete this password?");
    if (c) {

      const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedPasswordArray);
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
      let res = await fetch("http://localhost:3000/", {method: "DELETE", headers:{"Content-type": "application/json"}, body:JSON.stringify({ id}) })
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with", id);
    setForm({...passwordArray.filter(i => i.id === id)[0], id: id})
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        <ToastContainer/>
      
      <div className="mycontainer min-h-[88vh]">
        <h1 className='text-white text-4xl text-center font-bold'>Aegis</h1>
        <p className='text-white text-lg text-center'>Your Password Manager</p>
        <div className="text-white flex flex-col p-4 gap-6 items-center">
          <input value={form.site} onChange={handleChange} name='site' id='site' type="text" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Website URI' />
          <div className="flex w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} name='username' id='username' type="text" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' id='password' type="password" className='rounded-lg border-2 border-solid border-blue-800 text-black p-4 py-1.5 w-full' placeholder='Enter Password' />
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
        <div className="passwords text-white">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show &#58; &#40;</div>}
          {passwordArray.length !== 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-[#131b2e]'>
                <tr>
                  <th className='py-2 border-b border-slate-600'>URI</th>
                  <th className='py-2 border-b border-slate-600'>Username</th>
                  <th className='py-2 border-b border-slate-600'>Password</th>
                  <th className='py-2 border-b border-slate-600'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-[#1e293b]'>
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className='justify-center text-center py-1.5 border-b border-slate-600'>
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='_blank' rel='noopener noreferrer'>{item.site}</a>
                        <img className='iconcopy invert cursor-pointer w-7 h-7 px-2' src="/assets/copy.svg" alt="copy" onClick={() => copyText(item.site)} />
                      </div>
                    </td>

                    <td className='text-center py-1.5 border-b border-slate-600'>
                      <div className='flex items-center justify-center'>
                        <span>{item.username}</span>
                        <img className='iconcopy invert cursor-pointer w-7 h-7 px-2' src="/assets/copy.svg" alt="copy" onClick={() => copyText(item.username)} />
                      </div>
                    </td>
                    <td className='text-center py-1.5 border-b border-slate-600'>
                      <div className='flex items-center justify-center'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <img className='iconcopy invert cursor-pointer w-7 h-7 px-2' src="/assets/copy.svg" alt="copy" onClick={() => copyText(item.password)} />
                      </div>
                    </td>
                    <td className='py-1.5 border-b border-slate-600'>
                      <div className='flex items-center justify-center gap-3'>
                        <span>
                          <img src="/assets/edit.svg" alt="edit" className='w-5 h-5 cursor-pointer' onClick={() => editPassword(item.id)} />
                        </span>
                        <span>
                          <img src="/assets/delete.svg" alt="delete" className='w-5 h-5 cursor-pointer' onClick={() => deletePassword(item.id)} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
        </div>
      </div>
    </>
  );
}

export default Manager;
