import React from 'react'
import './UserLayout.css'

const UserLayout = () => {
  return (
    <div className='userLayout'>
      <div className='menu'>
        <ul className='menu-ul'>
          <li>진료안내</li>
          <li>이용안내</li>
          <li>진료예약</li>
          <li>고객서비스</li>
        </ul>
      </div>

      <div className='img'>이미지</div>

      <div className='content'>
        <div>게시판</div>
        <div>
          <div>진료안내</div>
          <div>이용안내</div>
          <div>예약하기</div>
          <div>문의하기</div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout