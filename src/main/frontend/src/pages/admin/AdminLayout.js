import React from 'react'
import './AdminLayout.css'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='adminLayout'>
      <div className='adminLayout-content'>
        <div className='side-menu'>
          <ul>
            <li>진료</li>
            <li>예약</li>
            <li>직원</li>
          </ul>
        </div>
        <div className='main-menu'>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default AdminLayout