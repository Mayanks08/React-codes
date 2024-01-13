import { useState } from 'react'

import './App.css'

function App() {
  const [counter, setCounter] = useState(2)
  // let counter = 2;
  
  const addValue = () => {        
    // console.log("clicked",counter)
    // counter = counter + 1
    if (counter < 50) {
    setCounter(prevCount=> prevCount+1 )
    }
  }
  const minusValue  = () => {
    // console.log("clicked",counter)
     // counter = counter - 1
     if (counter > 0) {
    setCounter(prevCount=> prevCount-1 )
  }
  }
  const performOperation = (operation, value) => {
    return operation(value);
  };

  const customOperation = (value) => {
    // Define your custom operation here
    return value * 2;
  };

  const handleCustomOperation = () => {
    const result = performOperation(customOperation, counter);
    setCounter(prevCount=> prevCount - prevCount )
  };



  return (
    < div className='border-rose-400 border-solid border-4 rounded-xl p-6'>
    <h1 className='p-4'>Starting New Tech</h1>
    <h2 className='p-3'>Counter value : {counter}</h2>

    <button className='p-4 m-3  bg-green-500 hover:bg-indigo-700'
    onClick={addValue}
    >ADD + {counter}</button>
    <button className='p-4 m-3  bg-red-500 hover:bg-indigo-700 shadow-2xl shadow-teal-500/50 '
    onClick={minusValue}
    >MINUS - {counter}</button>
    <button className='p-4 m-3 bg-slate-500 hover:bg-indigo-700'
    onClick={handleCustomOperation}
    >Reset </button>
    </div>
  )
}

export default App
