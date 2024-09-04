import React, { useState } from 'react'
import './UserLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {
  const navigate = useNavigate();

  const [dropDown, setDropDown] = useState();
  

  function DropDown(){
    return(
      <div>
        <div>
          <li>진료안내</li>
          <li>진료안내</li>
        </div>
        <div>
          <li>이용안내</li>
          <li>이용안내</li>
        </div>
        <div>
          <li>진료예약</li>
          <li>진료예약</li>
        </div>
        <div>
          <li>고객서비스</li>
          <li>고객서비스</li>
        </div>
      </div>
    );
  }

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
      
      <div className='outlet'><Outlet /></div>

      <div className='foot'>
        <div>
          <ul>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>운영·관리방침</li>
          </ul>
        </div>
        <div className='footAddr'>울산광역시 남구 삼산중로 100번길 26</div>
      </div>
    </div>
  )
}

export default UserLayout