import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrder from '../features/user/components/UserOrder'

const UserOrderPage = () => {
  return (
    <Navbar>
        <h1 className='mx-auto text-2xl'>Your Orders</h1>
        <UserOrder></UserOrder>
    </Navbar>
  )
}

export default UserOrderPage