import { useState } from 'react'
import './App.css'
import Card from './components/card '

function App() {
 
  return (
    <>
      <h1 className='bg-green-600  text-black p-4 rounded-xl mb-5'>Tailwind Testing</h1>
      <Card username='Mayank lp' btnText='Click me'/>
      <Card username="mayank dev " btnText='visit me'/>
      
    </>
  )
}

export default App
