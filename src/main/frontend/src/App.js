import './App.css';
import './reset.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import StaffManage from './pages/admin/StaffManage';
import AdminHome from './pages/admin/AdminHome';
import UserHome from './pages/user/UserHome';
import Join from './pages/user/Join';
import Chart from './pages/admin/Chart';
import DoctorManage from './pages/admin/DoctorManage';
import Login from './pages/user/Login';
import { useEffect, useState } from 'react';
import History from './pages/admin/History';
import AddChart from './pages/admin/AddChart';


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
            <div className='login-info'>
              {loginInfo.memName}님 반갑습니다.
              <span onClick={() => {
                //세션에 저장된 로그인 정보 삭제
                window.sessionStorage.removeItem('loginInfo');
                
                //loginInfo state 변수의 값을 비워줌
                setLoginInfo({});
                navigate('/');
              }}>Logout</span>
            </div>
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
              setLoginInfo={setLoginInfo} />}/>
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

              {/* 관리자용 - 병원장 */}
              <Route path='doctorManage' element={<DoctorManage />} />

            </Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;
