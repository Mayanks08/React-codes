import { useState } from 'react'
import './App.css'

function App() {
  const [colour, setColour] = useState("pink")

  return (
  <div className='w-full h-screen duration-200 p-0 m-0'
  style={{ backgroundColor: colour }}>
    <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-2 px-2'>
      <div className='flex flex-wrap justify-center gap-3 shadow-lg  shadow-indigo-800/40 bg-transparent  rounded-2xl px-3 py-3'>
        <button onClick={() => setColour('red')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"red"}}
        >RED</button>
         <button onClick={() => setColour('ORANGE')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"ORANGE"}}
        >ORANGE</button>
         <button onClick={() => setColour('WHITE')}
        className='outline-none px-4 py-3 rounded-full text-BLACK shadow-lg shadow-white'
        style={{backgroundColor:"WHITE"}}
        >WHITE</button>
         <button onClick={() => setColour('YELLOW')}
        className='outline-none px-4 py-3 rounded-full text-BLACK shadow-lg shadow-white'
        style={{backgroundColor:"YELLOW"}}
        >YELLOW</button>
         <button onClick={() => setColour('BLUE')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"BLUE"}}
        >BLUE</button>
         <button onClick={() => setColour('BLACK')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"BLACK"}}
        >BLACK</button>
         <button onClick={() => setColour('green')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"green"}}
        >GREEN</button>
      </div>
    </div>
    <div className='fixed flex flex-wrap justify-center top-28 left-0'>
      <div className='flex flex-col justify-start gap-3 shadow-lg  shadow-indigo-800/40 bg-transparent  rounded-2xl px-3 py-3'>
        <button onClick={() => setColour('Maroon')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"Maroon"}}
        >Maroon</button>
         <button onClick={() => setColour('FireBrick')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"FireBrick"}}
        >Fire Brick</button>
         <button onClick={() => setColour('OrangeRed')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"OrangeRed"}}
        >OrangeRed</button>
         <button onClick={() => setColour('SandyBrown')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"SandyBrown"}}
        >Sandy Brown</button>
         <button onClick={() => setColour('navy')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"navy"}}
        >Navy</button>
         <button onClick={() => setColour('SlateGray')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"SlateGray"}}
        >Slate Gray</button>
         <button onClick={() => setColour('Indigo')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"Indigo"}}
        >Indigo</button>
      </div>
      </div>
      <div className='fixed flex flex-wrap justify-center top-28 right-1 '>
      <div className='flex flex-col justify-start gap-3 shadow-lg  shadow-indigo-800/40 bg-transparent  rounded-2xl px-3 py-3'>
        <button onClick={() => setColour('PaleVioletRed')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"PaleVioletRed"}}
        >Magenta </button>
         <button onClick={() => setColour('Thistle')}
        className='outline-none px-4 py-3 rounded-full text-black shadow-lg shadow-white'
        style={{backgroundColor:"Thistle"}}
        >Thistle</button>
         <button onClick={() => setColour('ForestGreen')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"ForestGreen"}}
        >ForestGreen</button>
         <button onClick={() => setColour('Khaki')}
        className='outline-none px-4 py-3 rounded-full text-black shadow-lg shadow-white'
        style={{backgroundColor:"Khaki"}}
        >Khaki</button>
         <button onClick={() => setColour('RosyBrown')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"RosyBrown"}}
        >Rosy Brown</button>
         <button onClick={() => setColour('SeaGreen')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"SeaGreen"}}
        >Sea Green</button>
         <button onClick={() => setColour('SteelBlue')}
        className='outline-none px-4 py-3 rounded-full text-white shadow-lg shadow-white'
        style={{backgroundColor:"SteelBlue"}}
        >Steel Blue</button>
      </div>
      </div>
  </div>
  
  )
}
export default App
