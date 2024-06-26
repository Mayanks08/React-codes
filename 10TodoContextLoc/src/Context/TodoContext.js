import { createContext,useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {   id: 1,
             todo: 'coding sheek li',
              completed: false 
        },
        
    ],
    addTodo:(todo)=>{},
    removeTodo:(id)=>{},
    toggleCompleted:(id)=>{},
    updateTodo: (id,todo) => {}
    
})


export const useTodo =()=>{
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider