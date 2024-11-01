import React, { useState } from 'react';
import './AdminLayout.css';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  //세션에 있는 로그인 정보를 받아 옴
  const sessionLoginInfo =  window.sessionStorage.getItem('loginInfo');
  const loginInfo = JSON.parse(sessionLoginInfo);

  const [isShow, setIsShow] = useState(null);

  const [adminMenu, setAdminMenu] = useState([
    {
      title: '진료 관리',
      path: '/admin/chart',
      subMenu: [
        { title: '진료 목록', path: '/admin/chart' },
        { title: '환자 차트', path: '/admin/chart' },
        { title: '예약 목록', path: '/admin/chart' }
      ]
    },
    {
      title: '환자 관리',
      path: '/admin/userManage',
      subMenu: [
        { title: '예약', path: '/admin/userManage' },
        { title: '문의하기', path: '/admin/userManage' },
        { title: '환자 목록', path: '/admin/userManage' }
      ]
    },
    {
      title: '직원 일정 관리',
      path: '/admin/staffManage',
      subMenu: [
        { title: '직원 스케쥴 목록', path: '/admin/staffManage' }
      ]
    },
    {
      title: '의료용품 관리',
      path: '/admin/orderItem',
      subMenu: [
        { title: '입고 관리', path: '/admin/orderItem' },
        { title: '발주 관리', path: '/admin/orderingItem' },
        { title: '재고 관리', path: '/admin/stockItem' }
      ]
    },
    // staffRole이 ADMIN일 때만 메뉴 추가
    ...(loginInfo.staffRole === 'ADMIN' ? [{
      title: '병원장',
      path: '/admin/doctorManage',
      subMenu: [
        { title: '직원 관리', path: '/admin/doctorManage' },
        { title: '매출 관리', path: '/admin/doctorManage' }
      ]
    }] : []),
  ]);

  const clickMenu = (index, path) => {
    setIsShow(isShow === index ? null : index);
    if (path) {
      navigate(path);
    }
  };

  const clickSubMenu = (subPath) => {
    navigate(subPath);
  };

  return (
    <div className='adminLayout'>
      <div className='adminLayout-content'>
        <div className='side-menu'>
          {/* <div className='staffPage'>직원 전용 페이지</div> */}
          {adminMenu.map((menu, index) => (
            <div key={index} className="menu-title">
              <div
                className={`menu-title ${isShow === index ? 'active' : ''}`}
                onClick={() => clickMenu(index, menu.path)}
              >
                {menu.title}
                <span><i className="bi bi-caret-down-fill"></i></span>
              </div>
              {isShow === index && (
                <div className='dropdown-menu'>
                  <ul>
                    {menu.subMenu.map((sub, subi) => (
                      <li
                        key={subi}
                        onClick={() => clickSubMenu(sub.path)}
                      >
                        {sub.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='main-menu'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
