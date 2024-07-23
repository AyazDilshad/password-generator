import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
 
  const [length, setLength] = useState(8)
  const [numsAllowed, setNumsAllowed] = useState(false)
  const [charsAllowed, setcharsAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numsAllowed) str += "0123456789"

    if (charsAllowed) str += "!@#$%^&*()[}{]<>?/|"

    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numsAllowed, charsAllowed, setPassword]) 

  useEffect(() => {
    passwordGenerator()
  }, [length, numsAllowed, charsAllowed, passwordGenerator])


  const passwordRef = useRef(null)

  const copyToClipBoard = useCallback( ()=>{
    passwordRef.current?.select(password)
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)

  }, [password ] )


 
  return (
    <>
     <div className='width-full max-w-md mx-auto shadow-lg rounded-lg p-6 bg-gray-600 text-orange-400'>
      <h1 className='text-4xl text-center mb-4 text-white'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        className='w-full p-3 text-gray-700 bg-gray-200 rounded-l' 
        placeholder='Password' 
        value={password} 
        readOnly=""
        ref={passwordRef} 
        />
        
        <button 
        className='p-3 text-blue-500 bg-gray-800 hover:bg-gray-700 hover:text-white' 
        onClick={copyToClipBoard}
         > 
        Copy
        </button>

      </div>
      <div className='flex justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <input type="range"
          min="8" 
          max="100" 
          value={length} 
          className='cursor-pointer w-3/4'
          onChange={(e) => setLength(e.target.value)}
          />
          <label className='block text-sm font-medium text-gray-300 sm:text-base md:text-lg'>Length:{length} </label>
        </div>
        <div className='flex items-center space-x-2 ml-4'>
          <input type="checkbox"
          checked={numsAllowed}
          id='numberinput'
          className='cursor-pointer w-3/4'
          onChange={() => setNumsAllowed((prev) => !prev)}
          />
          <label className='block text-sm font-medium text-gray-300 sm:text-base md:text-lg'>Numbers:{numsAllowed} </label>
        </div>
        <div className='flex items-center space-x-2 ml-4'>
          <input type="checkbox"
          checked={charsAllowed}
          id='charsinput'
          className='cursor-pointer w-3/4'
          onChange={() => setcharsAllowed((prev) => !prev)}
          />
          <label className='block text-sm font-medium text-gray-300 sm:text-base md:text-lg'>Charactors:{charsAllowed} </label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
