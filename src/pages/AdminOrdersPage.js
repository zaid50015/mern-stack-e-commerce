import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminOrders from '../features/admin/components/AdminOrders'
const AdminOrdersPage = () => {
  return (
    <Navbar>
        <AdminOrders></AdminOrders>
    </Navbar>
  )
}

export default AdminOrdersPage