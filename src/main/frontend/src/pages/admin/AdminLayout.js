import React, { useEffect, useState } from 'react'
import './AdminLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);
  const [adminMenu, setAdminMenu] = useState([
    {
      title: '진료 관리',
      path: ['/admin/chart'],
      subMenu: ['진료 목록', '환자 차트', '예약 목록']
    },
    {
      title: '환자 관리',
      path: ['/admin/userManage'],
      subMenu: ['예약', '문의하기', '환자 목록']
    },
    {
      title: '직원 일정 관리',
      path: ['/admin/staffManage'],
      subMenu: ['직원 스케쥴 목록']
    },
    // 로그인 정보가 없을 경우에도 사이드바 메뉴는 항상 표시
  ]);

  useEffect(() => {
    // 세션에 있는 로그인 정보를 받아 옴
    const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
    const parsedLoginInfo = JSON.parse(sessionLoginInfo);
    setLoginInfo(parsedLoginInfo);
  }, []);

  useEffect(() => {
    // 로그인 정보가 변경될 때마다 병원장 메뉴 설정
    if (loginInfo) {
      const menu = [
        ...adminMenu,
        ...(loginInfo.staffRole === 'ADMIN' ? [{
          title: '병원장',
          path: ['/admin/doctorManage'],
          subMenu: ['직원 관리', '매출 관리']
        }] : [])
      ];

      setAdminMenu(menu);
    }
  }, [loginInfo]);

  const clickMenu = (i, path) => {
    setIsShow(isShow ===i ? null : i);

    if(path){
      navigate(path);
    }
  }

  return (
    <div className='adminLayout'>
      <div className='adminLayout-content'>
      <div className='side-menu'>
          {adminMenu.map((menu, index) => (
            <div key={index} className="menu-title">
              <div
                className={`menu-title ${isShow === index ? 'active' : ''}`}
                onClick={() => clickMenu(index, menu.path[0])}
              >
                {menu.title}
                <span><i className="bi bi-caret-down-fill"></i></span>
              </div>
              {isShow === index && (
                <div className='dropdown-menu'>
                  <ul>
                    {menu.subMenu.map((sub, subi) => (
                      <li
                        key={subi} onClick={() => clickMenu(index, menu.path[subi])}>
                        {sub}
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
  )
};

export default AdminLayout