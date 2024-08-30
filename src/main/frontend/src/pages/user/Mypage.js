import React from 'react'
import { Outlet, Route, useNavigate } from 'react-router-dom'
import Infoupdate from './Infoupdate';
import './Mypage.css'

const Mypage = () => {
  const navigate=useNavigate();

  //세션에 있는 로그인정보 받아오기
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginData = JSON.parse(sessionLoginInfo);    

  return (
    <div className='mypage-div'>
      <div>
        <h2>My Page</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li onClick={(e)=>{navigate(`/mypage/infoupdate/${loginData.memId}`)}}>개인정보 수정</li>
          <li onClick={(e)=>{navigate(`/mypage/qna/${loginData.memNum}`)}}>1:1 문의</li>
          <li>진료이력보기</li>
        </ul>
      </div>
      <div className='mypage-content-div'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Mypage


