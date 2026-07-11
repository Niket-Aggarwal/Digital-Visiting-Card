import React from 'react'
import useAuth from "../Hooks/useAuth";
import useCard from "../Hooks/useCard";

const Dashboard = () => {

  const {user,messuser,logout}=useAuth()
  const {card,messcard}=useCard()
  console.log(user)
  console.log(card)
  console.log(messcard)
  console.log(messuser)
  return (
    <div>
        <p className='bg-amber-500'>h</p>    
        <button onClick={logout} className='bg-blue-50'>logout</button>  
    </div>
  )
}

export default Dashboard
