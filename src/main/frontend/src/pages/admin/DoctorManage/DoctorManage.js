import React, { useEffect } from 'react';
import './DoctorManage.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const DoctorManage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 세션에서 로그인 정보 가져오기
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginData = JSON.parse(sessionLoginInfo);

  // 사용자 역할이 admin인지 확인
  useEffect(() => {
    if (!loginData || loginData.staffRole !== 'ADMIN') {
      navigate('/admin/unauthorized'); // 권한이 없는 페이지로 리디렉션
    }
  }, [loginData, navigate]);

  // 현재 경로에 따른 메뉴 항목 클래스 설정
  const getPage = (path) => (location.pathname === path ? 'active' : '');

  return (
    <div className='doctorManage'>
      <div className='doctor-sideList'>
        <ul>
          <li
            onClick={() => {
              navigate('/admin/doctorManage');
            }}
            className={getPage('/admin/doctorManage')}
          >
            직원등록 및 현황
          </li>
          <li
            onClick={() => {
              navigate('/admin/doctorManage/staffChange');
            }}
            className={getPage('/admin/doctorManage/staffChange')}
          >
            직원정보 수정 및 삭제
          </li>
        </ul>
      </div>

      <div className='doctor-content'>
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorManage;
