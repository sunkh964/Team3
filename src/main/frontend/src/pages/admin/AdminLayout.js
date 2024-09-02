import React, { useState } from 'react'
import './AdminLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(null);

  const [adminMenu, setAdminMenu] = useState([
    {
      title: '진료 관리',
      path: '/admin/chart',
      subMenu: ['진료 목록', '환자 차트', '예약 목록']
    },
    {
      title: '환자 관리',
      path: '/admin',
      subMenu: ['예약', '문의하기', '환자 목록']
    },
    {
      title: '직원 일정 관리',
      path: '/admin/staffManage',
      subMenu: ['직원 스케쥴 목록']
    },
    {
      title: '병원장',
      path: '/admin/doctorManage',
      subMenu: ['직원 관리', '매출 관리']
    }
  ]);

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
                        key={subi}>
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