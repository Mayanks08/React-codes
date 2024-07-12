import { createSlice , nanoid} from "@reduxjs/toolkit";

const initialState ={
    todos:[
         { id: "1", title:"Buy groceries", completed: false },
    ]
}

export const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo ={
                id :nanoid(),
                text : action.payload, 
                completed :false
            }
            state.todos.push(todo)
        },
        removeTodo:(state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        toggleCompleted:(state, action)=> {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        updateTodo: (state, action )=>{
            return state.todos.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        }
        }
})

 export  const {addTodo,removeTodo,updateTodo,toggleCompleted}=todoSlice.actions;

 export default  todoSlice.reducer;