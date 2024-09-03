import './App.css';
import './reset.css';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import StaffManage from './pages/admin/StaffManage';
import AdminHome from './pages/admin/AdminHome';
import UserHome from './pages/user/UserHome';
import Join from './pages/user/Join';
import Chart from './pages/admin/Chart';
import DoctorManage from './pages/admin/DoctorManage/DoctorManage';
import Login from './pages/user/Login';
import { useEffect, useState } from 'react';
import History from './pages/admin/History';
import Mypage from './pages/user/Mypage';
import Infoupdate from './pages/user/Infoupdate';
import Qna from './pages/user/Qna';
import Qupldate from './pages/user/Qupldate';

import StaffDetail from './pages/admin/DoctorManage/StaffDetail';
import AddChart from './pages/admin/AddChart';
import DoctorHome from './pages/admin/DoctorManage/DoctorHome';
import StaffChange from './pages/admin/DoctorManage/StaffChange';
import ReviseChart from './pages/admin/ReviseChart';
import Reservation from './pages/user/Reserv/Reservation';
import Qdetail from './pages/user/Qdetail';
import UserHistory from './pages/user/UserHistory';
import Notice from './pages/user/Notice';
import Reserv_staff from './pages/admin/UserManage/Reserv_staff';



function App() {

  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({});

  useEffect(()=>{
    
    const sessionLoginInfo=window.sessionStorage.getItem('loginInfo');

    if(sessionLoginInfo!=null){
      const obj_loginInfo = JSON.parse(sessionLoginInfo);
      //2. 로그인 정보를 loginInfo에 저장
      setLoginInfo(obj_loginInfo);
    }
  },[]);

  return (
    <div className="App">
        <div className='head-line'>
          <div className='head'>
            <div className='head-name' onClick={() => {navigate('/');}}>
              그린카페병원
            </div>
            <div className='head-login'>
              {
            Object.keys(loginInfo).length == 0
            ?
            <ul className='header-menu'>
              <li>
                <span onClick={(e)=> {navigate('/login')}}>로그인</span>
              </li>
              <li>
                <span onClick={() => {navigate('/join')}}>회원가입</span>
              </li>
            </ul>
            :
            <ul className='header-menu'>
            <li>
            {loginInfo.memName}{loginInfo.staffName}님 반갑습니다.
            </li>
            <li><span onClick={()=>{navigate(`/mypage/infoupdate/${loginInfo.memId}`)}}>마이페이지</span></li>
            <li>
            <span onClick={() => {
                //세션에 저장된 로그인 정보 삭제
                window.sessionStorage.removeItem('loginInfo');
                
                //loginInfo state 변수의 값을 비워줌
                setLoginInfo({});
                navigate('/');
              }}>Logout</span>
            </li>
          </ul>
          }
            </div>
          </div>
        </div>
  
        <div className='layout'>
          <Routes>
            {/* 회원용 */}
            <Route path='/' element={<UserLayout />}>
              {/* 회원용 - 첫 화면 */}
              <Route path='' element={<UserHome />} />
              {/* 회원 가입 화면 */}
              <Route path='/join' element={<Join/>}/>
              {/* 로그인 화면 */}
              <Route path='/login' element={<Login 
              setLoginInfo={setLoginInfo} loginInfo={loginInfo}/>}/>

                {/* 공지사항 큰화면 */}
                <Route path='/notice' element={<Notice/>}/>
              {/* 마이페이지 */}
              <Route path='/mypage' element={<Mypage loginInfo={loginInfo}/>}>
                {/* 마이페이지-개인정보수정 */}
                <Route path='infoupdate/:memId' element={<Infoupdate />} />
                {/* 마이페이지-1:1문의 */}
                <Route path='qna/:memNum' element={<Qna/>}/>
                {/* 마이페이지-문의하기상세보기 */}
                <Route path='qdetail/:qNum' element={<Qdetail loginInfo={loginInfo}/>}/>
                {/* 문의하기 등록, 작성 */}
                <Route path='qupdate/:memNum' element={<Qupldate loginInfo={loginInfo}/>}/>
                {/* 마이페이지- 진료이력보기*/}
                <Route path='userHistory/:memNum' element={<UserHistory/>}/>
              </Route>

              {/* 진료예약 */}
              <Route path='reserv' element={<Reservation />} />
              
            </Route>
  
            {/* 관리자용 */}
            <Route path='/admin' element={<AdminLayout />}>
              {/* 관리자용 - 첫 화면 */}
              <Route path='' element={<AdminHome />} />
              {/* 관리자용 - 직원 관리 */}
              <Route path='staffManage' element={<StaffManage />} />

              {/* 관리자용 - 진료 관리(차트) */}
              <Route path='chart' element={<Chart />} />
              {/* 관리자용 - 환자 진료 이력 */}
              <Route path='history/:memNum' element={<History/>}/>
              {/* 관리자용 - 당일 예약 환자 추가 */}
              <Route path='addChart' element={<AddChart/>}/>
              {/* 관리자용 - 차트 수정 */}
              <Route path='reviseChart/:memNum/:chartNum' element={<ReviseChart/>}/>

              {/* 관리자용- 환자관리 */}
              <Route path='userManage' element={<Reserv_staff/>}>

              </Route>

              {/* 관리자용 - 병원장 */}
              <Route path='doctorManage' element={<DoctorManage />}>
                {/* 병원장 - 첫화면(직원등록) */}
                <Route path='' element={<DoctorHome />}/>
                {/* 병원장 - 직원정보 수정 및 삭제 */}
                <Route path='staffChange' element={<StaffChange />}/>
                {/* 병원장 - 직원정보(상세보기) */}
                <Route path='staffDetail/:staffNum' element={<StaffDetail/>}/>
              </Route>
            </Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;
