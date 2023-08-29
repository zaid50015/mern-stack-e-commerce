import React from 'react'
import UserProfile from '../features/user/components/UserProfile'
import Navbar from '../features/Navbar/Navbar'

export const UserProfilePage = () => {
  return (
    <>
        <Navbar>
        <h1 className='mx-auto text-2xl'>Your Profile</h1>
        <UserProfile></UserProfile>
    </Navbar>
    </>
  )
}
