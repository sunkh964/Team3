import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './DoctorManage.css'
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import DoctorHome from './DoctorHome';

const DoctorManage = () => {
const navigate = useNavigate();

const location = useLocation();


// 현재 경로에 따른 메뉴 항목 클래스 설정
const getPage = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className='doctorManage'>
      <div className='doctor-sideList'>
        <ul>
          <li onClick={()=>{navigate('/admin/doctorManage')}}
              className={getPage('/admin/doctorManage')}>직원등록 및 현황</li>
          <li onClick={()=>{navigate('/admin/doctorManage/staffChange')}}
              className={getPage('/admin/doctorManage/staffChange')}>직원정보 수정 및 삭제</li>
        </ul>
      </div>

      <div className='doctor-content'>
      <Outlet />
      </div>
    </div>
  )
}

export default DoctorManage