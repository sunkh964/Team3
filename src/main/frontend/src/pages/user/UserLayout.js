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
        <div>
          <div>게시판/공지</div>
          <div>내용</div>
        </div>
        <div className='content-list'>
          <div className='content-list1'>
            <div>진료안내</div>
            <div>
              <div>과/의료진 안내</div>
              <div>예약 안내</div>
            </div>
          </div>
          <div className='content-list2'>
            <div>이용안내</div>
            <div>
              <div>시설 안내</div>
              <div>증명서발급</div>
            </div>
          </div>
          <div className='content-list3'>
            <div>진료예약</div>
            <div>
              <div>예약 하기</div>
              <div>예약 변경</div>
            </div>
          </div>
          <div className='content-list4'>
            <div>문의하기</div>
          </div>
        </div>
      </div>

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