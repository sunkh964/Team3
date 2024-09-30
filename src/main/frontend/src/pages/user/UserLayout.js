import React, { useState } from 'react'
import './UserLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {

  const navigate = useNavigate();

  const [dropDown, setDropDown] = useState({});

  const handleMouseEnter = (menu) => {
    setDropDown((prev) => ({ ...prev, [menu]: true }));
  };

  const handleMouseLeave = (menu) => {
    setDropDown((prev) => ({ ...prev, [menu]: false }));
  };

  const menus = [
    {
      title: '진료안내',
      items: [
        { name: '진료과/의료진', path: '/department' },
        { name: '진료일정표', path: '/schedule' },
        { name: '상담 예약', path: '/consultation' },
      ],
    },
    {
      title: '이용안내',
      items: [
        { name: '시설 안내', path: '/facility' },
        { name: '수납하기', path: '/payment' },
        { name: '증명서 발급', path: '/certificate' },
      ],
    },
    {
      title: '진료예약',
      items: [
        { name: '예약하기', path: '/book' },
        { name: '예약 변경', path: '/change' },
        { name: '상담 예약', path: '/consultation' },
      ],
    },
    {
      title: '고객서비스',
      items: [
        { name: '문의하기', path: '/inquiry' },
        { name: '공지사항', path: '/notices' },
      ],
    },
  ];

  return (
    <div className='userLayout'>
      <div className='menu'>
        <ul className='menu-ul'>
        <li onMouseEnter={() => handleMouseEnter('진료안내')} onMouseLeave={() => handleMouseLeave('진료안내')}>진료안내</li>
          <li onMouseEnter={() => handleMouseEnter('이용안내')} onMouseLeave={() => handleMouseLeave('이용안내')}>이용안내</li>
          <li onClick={() => {
            // 로그인 정보 확인
            const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
            const loginInfo = sessionLoginInfo ? JSON.parse(sessionLoginInfo) : null;
            
            console.log(loginInfo)
            if(loginInfo == null){
              alert('진료예약 이용시 로그인이 필요합니다')
              navigate('/login')
            }
            else{
              navigate('/reserv')
            }
          }}
            onMouseEnter={() => handleMouseEnter('진료예약')} onMouseLeave={() => handleMouseLeave('진료예약')}
          >진료예약</li>
          <li onMouseEnter={() => handleMouseEnter('고객서비스')} onMouseLeave={() => handleMouseLeave('고객서비스')}>고객서비스</li>
        </ul>
        <div className='menu-icon'>
          <i className="bi bi-list-task"></i>
        </div>
      </div>
        
      <div className='dropRelative'>
        <div className={`menu-dropdown ${dropDown['고객서비스'] || ['진료예약']? 'active' : ''}`}
            >
          {dropDown['고객서비스'] && (
            <div className='dropdown'
                onMouseEnter={() => handleMouseEnter('고객서비스')}
                onMouseLeave={() => handleMouseLeave('고객서비스')}>
              <ul className='dropdown-ul'>
                {menus.find(menu => menu.title === '고객서비스').items.map((item, index) => (
                  <li key={index} onClick={() => navigate(item.path)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {dropDown['진료안내'] && (
            <div className='dropdown'
                onMouseEnter={() => handleMouseEnter('진료안내')}
                onMouseLeave={() => handleMouseLeave('진료안내')}>
              <ul className='dropdown-ul'>
                {menus.find(menu => menu.title === '진료안내').items.map((item, index) => (
                  <li key={index} onClick={() => navigate(item.path)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {dropDown['이용안내'] && (
            <div className='dropdown'
                onMouseEnter={() => handleMouseEnter('이용안내')}
                onMouseLeave={() => handleMouseLeave('이용안내')}>
              <ul className='dropdown-ul'>
                {menus.find(menu => menu.title === '이용안내').items.map((item, index) => (
                  <li key={index} onClick={() => navigate(item.path)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {dropDown['진료예약'] && (
            <div className='dropdown'
                onMouseEnter={() => handleMouseEnter('진료예약')}
                onMouseLeave={() => handleMouseLeave('진료예약')}>
              <ul className='dropdown-ul'>
                {menus.find(menu => menu.title === '진료예약').items.map((item, index) => (
                  <li key={index} onClick={() => navigate(item.path)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div> 진료과안내</div>
        </div>
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