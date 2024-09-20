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
          <li>진료안내</li>
          <li>이용안내</li>
          <li onClick={() => { navigate('/reserv') }}>진료예약</li>
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>고객서비스</li>
        </ul>
        <div className='menu-icon'>
          <i className="bi bi-list-task"></i>
        </div>
      </div>
        
      <div className={`menu-dropdown ${dropDown['고객서비스'] ? 'active' : ''}`}>
        {dropDown['고객서비스'] && (
          <div className='dropdown'>
            <div className='dropTitle'>고객서비스</div>
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
          <div className='dropdown'>
            <div className='dropTitle'>진료안내</div>
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
          <div className='dropdown'>
            <div className='dropTitle'>이용안내</div>
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
          <div className='dropdown'>
            <div className='dropTitle'>진료예약</div>
            <ul className='dropdown-ul'>
              {menus.find(menu => menu.title === '진료예약').items.map((item, index) => (
                <li key={index} onClick={() => navigate(item.path)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
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