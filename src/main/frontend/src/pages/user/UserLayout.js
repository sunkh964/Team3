import React from 'react'
import './UserLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {
  const navigate = useNavigate();

  return (
    <div className='userLayout'>
      <div className='menu'>
        <ul className='menu-ul'>
          <li>진료안내</li>
          <li>이용안내</li>
          <li onClick={() => {navigate('/reserv')}}>진료예약</li>
          <li>고객서비스</li>
        </ul>
      </div>
      
      <Outlet />

      <div className='foot'>
        <div>
          <ul>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>운영·관리방침</li>
            <li>어쩌구..</li>
          </ul>
        </div>
        <div>울산광역시 어쩌구</div>
      </div>
    </div>
  )
}

export default UserLayout