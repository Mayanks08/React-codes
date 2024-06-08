import { createContext ,useContext } from "react"
import React  from 'react'

export const ThemeContext = createContext({
    themeMode:"light",
    darkTheme:  () => {},
    lightTheme :()=> {}
})
 export const ThemeProvider= ThemeContext.Provider;
 //Hook to use the context outside of a provider
 export default function useTheme(){
    return useContext(ThemeContext)
 }