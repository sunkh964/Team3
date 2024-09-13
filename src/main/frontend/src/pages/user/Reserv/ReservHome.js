import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ReservHome = () => {
  const navigate = useNavigate();

  return (
    <div className='reserv-container'>
      <div id='sidebar'>
        <div>진료예약</div>
        <ul>
          <li onClick={()=>{navigate('/reserv')}}>예약하기</li>
          <li onClick={()=>{navigate('/reserv/resSelect')}}>예약조회</li>
          <li>간편예약</li>
        </ul>
      </div>

      <div className='reserv-content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default ReservHome