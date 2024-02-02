import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
   
  const [length,setLength] = useState(9)
  const [numAllow,setNumAllow] = useState(false)
  const [charIn, setCharIn] = useState(false)
  const [password,setPassword] = useState("")

   //useRef hook
   const passwordRef = useRef(null)

  const PasswordGen = useCallback( () =>{
    let pass =""
    let string ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllow) {
      string +="0123456789"
    }
     if (charIn) { string +="!@#$%^&*()_{}-=+~`"}
     for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*string.length + 1 );
      pass += string.charAt(char)
     }
     setPassword(pass)
  },[length,numAllow,charIn,setPassword])

  const copyPasswordToClipboard = useCallback (() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    PasswordGen()
  },[length,numAllow,charIn,PasswordGen])

  return (
    <>
     <div className='w-full max-w-md mx-auto rounded-lg  text-orange-400 bg-gray-700 px-4 py-3 my-8 shadow-md'>
      <h1 className='text-white text-center my-3'> Password genrator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
       <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 hover:bg-orange-900 active:bg-red-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range" 
      min={8}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={e=>setLength(Number(e.target.value))}
      />
      <label > length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox" 
      defaultChecked={numAllow}
      id='numberInput'
      onChange={() => {
        setNumAllow((prev) => !prev)
      }}
      />
      <label htmlFor='numberInput' >Number</label>
    </div>
    <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={charIn}
          id="characterInput"
          onChange={() => {
              setCharIn((prev) => !prev )
          }}
      />
      <label htmlFor="characterInput">Characters</label>
  </div>
  </div>
  </div>
</>
)}

export default App
