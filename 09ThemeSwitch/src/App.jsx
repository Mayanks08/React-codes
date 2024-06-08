import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './context/Theme'
import { useEffect } from 'react';
import ThemeBtn from './components/ThemeBtn';
import Card from './components/Card';

function App() {
  const [themeMode ,setThemeMode] = useState('light');
  const lightTheme =()=>{
    setThemeMode("light")
  }
  const darkTheme =()=>{
    setThemeMode("dark")
  }
  // actual theme change
  useEffect(() => {
    document.querySelector(`html`).classList.remove('light','dark')
    document.querySelector(`html`).classList.add(themeMode)
  
  }, [themeMode])
  
  return (
    <>
    <h1 className='text-4xl text-stone-200 bg-blue-600 p-4 m-2 rounded-3xl'>Theme Button</h1>
    <ThemeProvider value={{themeMode ,lightTheme,darkTheme}}>
       <div className="flex flex-wrap min-h-screen items-center">
    <div className="w-full">
        <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
          <ThemeBtn />
        </div>

        <div className="w-full max-w-sm mx-auto">
           <Card/>
           <Card/>
        </div>
    </div>
          </div>
    </ThemeProvider>
    </>
  )
}

export default App
