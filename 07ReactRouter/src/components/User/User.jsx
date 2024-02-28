import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userid} = useParams()
  return (
    <div className='bg-gray-800 text-white p-5 text-4xl'>User:{userid}</div>
  )
}

export default User