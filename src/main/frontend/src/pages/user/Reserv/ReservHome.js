import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import './Reservation.css'

const ReservHome = () => {
  const navigate = useNavigate();

    // 로그인 정보 확인
    const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
    const loginInfo = sessionLoginInfo ? JSON.parse(sessionLoginInfo) : null;

  return (
    <div className='reserv-container'>
      <div id='sidebar'>
        <div>진료예약</div>
        <ul>
          <li onClick={()=>{navigate('/reserv')}}>예약하기</li>
          <li onClick={()=>{navigate(`/reserv/resSelect/${loginInfo.patieNum}`)}}>예약조회</li>
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