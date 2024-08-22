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

      <div className='foot'>
        <div>
          <ur>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>운영·관리방침</li>
            <li></li>
          </ur>
        </div>
        <div>울산광역시 어쩌구</div>
      </div>
    </div>
  )
}

export default UserLayout