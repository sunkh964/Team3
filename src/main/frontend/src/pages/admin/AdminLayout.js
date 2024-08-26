import React from 'react'
import './AdminLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className='adminLayout'>
      <div className='adminLayout-content'>
        <div className='side-menu'>
          <ul>
            <li>진료</li>
            <li>예약</li>
            <li>직원</li>
            <li onClick={()=>{navigate('/admin/doctorManage')}}>병원장</li>
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