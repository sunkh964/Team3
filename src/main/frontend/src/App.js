import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';

function App() {
  return (
    <div className="App">
        <div className='head'>
          <div className='head-name'>그린카페병원</div>
          <div className='head-login'>
            <ul>
              <li>로그인</li>
              <li>회원가입</li>
            </ul>
          </div>
        </div>
  
        <div className='layout'>
          <Routes>
            {/* 회원용 */}
            <Route path='/' element={<UserLayout />}>
  
            </Route>
  
            {/* 관리자용 */}
            <Route path='/admin' element={<AdminLayout />}>
  
            </Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;
