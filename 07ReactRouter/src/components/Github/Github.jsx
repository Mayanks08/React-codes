import React, { useEffect, useState } from 'react'

function Github() {
  const [data,setData] = useState([])
    useEffect(() => {
      fetch('https://api.github.com/users/Mayanks08')
      .then(response => response.json())
      // Passes the data to the next then block 
      .then(data =>{
         console.log(data)
         setData(data)
        })
    }, [])
    
  return (
    <div className='text-center m-4 bg-gray-800 text-white  p-4 text-3xl'>Github ki janta :
      {data.followers}
      <img src= {data.avatar_url} alt="" width ={300} />
    </div>
  )
}

export default Github