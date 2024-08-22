import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import { Route, Router, Routes } from 'react-router-dom';
=======
import { Route, Routes } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
>>>>>>> bd85fd06aec6d8f42c40c9cc9e0dd804bb4c8f88

function App() {
  return (
    <div className="App">
<<<<<<< HEAD

      
=======
        <div className='head-line'>
          <div className='head'>
            <div className='head-name'>
              그린카페병원
            </div>
            <div className='head-login'>
              <ul>
                <li>로그인</li>
                <li>회원가입</li>
              </ul>
            </div>
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
>>>>>>> bd85fd06aec6d8f42c40c9cc9e0dd804bb4c8f88
    </div>
  );
}

export default App;
