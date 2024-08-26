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

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
        <div className='head-line'>
          <div className='head'>
            <div className='head-name' onClick={() => {navigate('/');}}>
              그린카페병원
            </div>
            <div className='head-login'>
              <ul>
                <li>로그인</li>
                <li onClick={()=>{navigate('/join')}}>회원가입</li>
              </ul>
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
            </Route>
  
            {/* 관리자용 */}
            <Route path='/admin' element={<AdminLayout />}>
              {/* 관리자용 - 첫 화면 */}
              <Route path='' element={<AdminHome />} />
              {/* 관리자용 - 직원 관리 */}
              <Route path='staffManage' element={<StaffManage />} />
              {/* 관리자용 - 진료 관리(차트) */}
              <Route path='chart' element={<Chart />} />
            </Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;
