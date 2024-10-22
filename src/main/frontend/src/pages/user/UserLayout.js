import React, { useState } from 'react';
import './UserLayout.css';
import { Outlet, useNavigate } from 'react-router-dom';

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
        { name: '예약하기', path: '/reserv' },
        { name: '예약변경', path: '/change' },
        { name: '간편예약', path: '/consultation' },
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

  const handleNavigation = (path) => {
    const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
    const loginInfo = sessionLoginInfo ? JSON.parse(sessionLoginInfo) : null;

    if (loginInfo == null) {
      alert('진료예약 이용 시 로그인이 필요합니다');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const renderMenuItems = (menuTitle) => (
    <>
      <div className='menuTitle'>{menuTitle}</div>
      <ul className='dropdown-ul'>
        {menus.find(menu => menu.title === menuTitle).items.map((item, index) => (
          <li key={index} onClick={item.name === '예약하기' || item.name === '예약변경' ? () => handleNavigation(item.path) : () => navigate(item.path)}>
            {item.name}
          </li>
        ))}
      </ul>
      {/* 고정 항목 */}
      <div className='fixItem'>
        <div>- 진료과안내 -</div>
        <div className='treatType'>
          <img src='http://localhost:8080/images/treat.png' />
          <div>진료과목 보기</div>
        </div>
        <div className='fix-search'>
          <div>진료과/의료진 찾기</div>
          <div className='fs'>
            <input type='text' placeholder='검색어를 입력하세요.' />
            <div><i className="bi bi-search"></i></div>
          </div>
        </div>
      </div>
      <div className='fixItem'>
        <div>- 위치서비스 -</div>
        <img src='http://localhost:8080/images/gnb_img3.png' />
        <div className='fixItem-navi'>
          <div>
            <span><i className="bi bi-geo-alt-fill"></i></span>
            <div>오시는 길</div>
          </div>
          <div>
            <span><i className="bi bi-p-square-fill"></i></span>
            <div>주차 안내</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className='userLayout'>
      <div className='menu'>
        <div className='menu-icon'>
          <i className="bi bi-list-task"></i>
        </div>
        <ul className='menu-ul'>
          <li onMouseEnter={() => handleMouseEnter('진료안내')} onMouseLeave={() => handleMouseLeave('진료안내')}>진료안내</li>
          <li onMouseEnter={() => handleMouseEnter('이용안내')} onMouseLeave={() => handleMouseLeave('이용안내')}>이용안내</li>
          <li onClick={() => handleNavigation('/reserv')}
              onMouseEnter={() => handleMouseEnter('진료예약')} onMouseLeave={() => handleMouseLeave('진료예약')}>
            진료예약
          </li>
          <li onMouseEnter={() => handleMouseEnter('고객서비스')} onMouseLeave={() => handleMouseLeave('고객서비스')}>고객서비스</li>
        </ul>
        <div className='menu-icon2'>
          <i className="bi bi-search"></i>
        </div>
      </div>

      <div className='dropRelative'>
        <div className={`menu-dropdown ${dropDown['고객서비스'] || dropDown['진료예약'] || dropDown['진료안내'] || dropDown['이용안내'] ? 'active' : ''}`}>
          {dropDown['진료안내'] && (
            <div className='dropdown' onMouseEnter={() => handleMouseEnter('진료안내')} onMouseLeave={() => handleMouseLeave('진료안내')}>
              {renderMenuItems('진료안내')}
            </div>
          )}
          {dropDown['이용안내'] && (
            <div className='dropdown' onMouseEnter={() => handleMouseEnter('이용안내')} onMouseLeave={() => handleMouseLeave('이용안내')}>
              {renderMenuItems('이용안내')}
            </div>
          )}
          {dropDown['진료예약'] && (
            <div className='dropdown' onMouseEnter={() => handleMouseEnter('진료예약')} onMouseLeave={() => handleMouseLeave('진료예약')}>
              {renderMenuItems('진료예약')}
            </div>
          )}
          {dropDown['고객서비스'] && (
            <div className='dropdown' onMouseEnter={() => handleMouseEnter('고객서비스')} onMouseLeave={() => handleMouseLeave('고객서비스')}>
              {renderMenuItems('고객서비스')}
            </div>
          )}
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
  );
}

export default UserLayout;
