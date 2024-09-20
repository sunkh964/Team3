import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import './Reservation.css'

const ReservHome = () => {
  const navigate = useNavigate();

  const {patieNum} = useParams();

  return (
    <div className='reserv-container'>
      <div id='sidebar'>
        <div>진료예약</div>
        <ul>
          <li onClick={()=>{navigate('/reserv')}}>예약하기</li>
          <li onClick={()=>{navigate(`/reserv/resSelect/1`)}}>예약조회</li>
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