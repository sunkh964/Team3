import React, { useState } from 'react'
import './UserLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {
  const navigate = useNavigate();

  const [dropDown, setDropDown] = useState();

  return (
    <div className='userLayout'>
      <div className='menu'>
        <ul className='menu-ul'>
          <li>진료안내</li>
            <ul></ul>
          <li>이용안내</li>
          <li onClick={() => {navigate('/reserv')}}>진료예약</li>
          <li>고객서비스</li>
        </ul>
        <div className='menu-icon'>
        <i className="bi bi-list-task"></i></div>
      </div>
      
      <div className='outlet'><Outlet /></div>

      <div className='foot'>
        <div>
          <ul>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>운영·관리방침</li>
            <li>이메일무단수집거부</li>
          </ul>
        </div>
        <div className='footAddr'>
          <div>
            <div>(44033) 울산광역시 동구 대학병원로 25 (전하동, 울산대학교병원)</div>
            <div>대표전화 : 052-250-7000</div>
            <div>진료예약 : 052-250-7979</div>
          </div>
          <div>COPYRIGHT(C)2016 ULSAN UNIVERSITY HOSPITAL. ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout