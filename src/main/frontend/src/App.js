import './App.css';
import './reset.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import StaffManage from './pages/admin/scheduleManage/StaffManage';
import AdminHome from './pages/admin/AdminHome';
import UserHome from './pages/user/UserHome';
import Join from './pages/user/loginManage/Join';
import Chart from './pages/admin/treatManage/Chart';
import DoctorManage from './pages/admin/doctorManage/DoctorManage';
import Login from './pages/user/loginManage/Login';
import { useEffect, useState } from 'react';
import History from './pages/admin/treatManage/History';
import Mypage from './pages/user/mypage/Mypage';
import Infoupdate from './pages/user/mypage/Infoupdate';
import Qna from './pages/user/mypage/Qna';
import Qupldate from './pages/user/mypage/Qupldate';

import StaffDetail from './pages/admin/doctorManage/StaffDetail';
import AddChart from './pages/admin/treatManage/AddChart';
import DoctorHome from './pages/admin/doctorManage/DoctorHome';
import StaffChange from './pages/admin/doctorManage/StaffChange';
import ReviseChart from './pages/admin/treatManage/ReviseChart';
import Reservation from './pages/user/reserv/Reservation';
import Qdetail from './pages/user/mypage/Qdetail';
import Reserv_staff from './pages/admin/userManage/Reserv_staff';
import UserHistory from './pages/user/mypage/UserHistory';
import Notice from './pages/user/cusService/Notice';
import InsertRec from './pages/admin/treatManage/InsertRec';
import Check from './pages/user/loginManage/Check';
import ReservSelect from './pages/user/reserv/ReservSelect';
import ReservHome from './pages/user/reserv/ReservHome';
import NoticeDetail from './pages/user/cusService/NoticeDetail';
import NotiUpdate from './pages/admin/NotiUpdate';
import OrderItem from './pages/admin/orderManage/OrderItem';
import ChartModal from './pages/admin/treatManage/ChartModal';
import Unauthorized from './pages/admin/Unauthorized';
import OrderingItem from './pages/admin/orderManage/OrderingItem';
import StockItem from './pages/admin/orderManage/StockItem';
import OrderingModal from './pages/admin/orderManage/OrderingModal';

function App() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({});

  useEffect(() => {
    const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');

    if (sessionLoginInfo != null) {
      const obj_loginInfo = JSON.parse(sessionLoginInfo);
      setLoginInfo(obj_loginInfo);
    }
  }, []);

  return (
    <div className="App">
      <div className='head-line'>
        <div className='head'>
          <div className='head1'>상담예약 √</div>
          <div className='head-name' onClick={() => { navigate('/'); }}>
            그린카페병원
            <span><img src={'http://localhost:8080/images/logo.png'} /></span>
          </div>
          <div className='head-login'>
            {
              Object.keys(loginInfo).length === 0
                ? <ul className='header-menu'>
                  <li>
                    <span onClick={() => { navigate('/login') }}>로그인</span>
                  </li>
                  <li>
                    <span onClick={() => { navigate('/check') }}>회원가입</span>
                  </li>
                </ul>
                : <ul className='header-menu'>
                  <li>
                    {loginInfo.memName}{loginInfo.staffName}님 반갑습니다.
                  </li>
                  <li>
                    {
                      loginInfo.staffRole !== 'ADMIN' && (
                        <li>
                          <span onClick={() => { navigate(`/mypage/infoupdate/${loginInfo.memId}`) }}>마이페이지</span>
                        </li>
                      )
                    }
                  </li>
                  <li>
                    <span onClick={() => {
                      window.sessionStorage.removeItem('loginInfo');
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
            {/* 회원가입 하기 전 동의란 */}
            <Route path='check' element={<Check />} />
            {/* 회원 가입 화면 */}
            <Route path='/join' element={<Join />} />
            {/* 로그인 화면 */}
            <Route path='/login' element={<Login setLoginInfo={setLoginInfo} loginInfo={loginInfo} />} />
            {/* 공지사항 큰화면 */}
            <Route path='/notice' element={<Notice />} />
            {/* 공지사항 상세보기 */}
            <Route path='/NoticeDetail/:boardNum' element={<NoticeDetail />} />
            {/* 마이페이지 */}
            <Route path='/mypage' element={<Mypage loginInfo={loginInfo} />}>
              {/* 마이페이지-개인정보수정 */}
              <Route path='infoupdate/:memId' element={<Infoupdate />} />
              {/* 마이페이지-1:1문의 */}
              <Route path='qna/:memNum' element={<Qna />} />
              {/* 마이페이지-문의하기상세보기 */}
              <Route path='qdetail/:qNum' element={<Qdetail loginInfo={loginInfo} />} />
              {/* 문의하기 등록, 작성 */}
              <Route path='qupdate/:memNum' element={<Qupldate loginInfo={loginInfo} />} />
              {/* 마이페이지- 진료이력보기 */}
              <Route path='userHistory/:memNum' element={<UserHistory />} />
            </Route>
            {/* 진료예약 */}
            <Route path='reserv' element={<ReservHome />}>
              <Route path='' element={<Reservation />} />
              <Route path='resSelect/:patieNum' element={<ReservSelect />} />
            </Route>
          </Route>

          {/* 관리자용 */}
          <Route path='/admin' element={<AdminLayout />}>
            {/* 관리자용 - 첫 화면 */}
            <Route path='' element={<AdminHome />} />
            {/* 공지사항 작성 */}
            <Route path='NotiUpdate' element={<NotiUpdate />} />
            {/* 관리자용 - 직원 관리 */}
            <Route path='staffManage' element={<StaffManage />} />
            {/* 관리자용 - 진료 관리(차트) */}
            <Route path='chart' element={<Chart />} />
            {/* 관리자용 - 차트 수납 모달 */}
            <Route path='chartModal' element={<ChartModal />} />
            {/* 관리자용 - 환자 진료 이력 */}
            <Route path='history/:patieNum' element={<History />} />
            {/* 관리자용 - 첫방문 환자 추가 */}
            <Route path='addChart' element={<AddChart />} />
            {/* 관리자용 - 재방문 환자 추가 */}
            <Route path='insertRec/:patieNum' element={<InsertRec />} />
            {/* 관리자용 - 차트 수정 */}
            <Route path='reviseChart/:patieNum/:recNum' element={<ReviseChart />} />
            {/* 관리자용- 환자관리 */}
            <Route path='userManage' element={<Reserv_staff />} />
            {/* 관리자용 - 병원장 */}
            <Route path='doctorManage' element={<DoctorManage />}>
              {/* 병원장 - 첫화면(직원등록) */}
              <Route path='' element={<DoctorHome />} />
              {/* 병원장 - 직원정보 수정 및 삭제 */}
              <Route path='staffChange' element={<StaffChange />} />
              {/* 병원장 - 직원정보(상세보기) */}
              <Route path='staffDetail/:staffNum' element={<StaffDetail />} />
            </Route>
            {/* 관리자용 - 입고 관리 */}
            <Route path='orderItem' element={<OrderItem />} />
            {/* 관리자용 -  발주 관리 */}
            <Route path='orderingItem' element={<OrderingItem/>}/>
            {/* 관리자용 - 재고 관리 */}
            <Route path='stockItem' element={<StockItem/>}/>
            {/* 관리자용 - 발주 모달 */}
            <Route path='orderingModal' element={<OrderingModal/>}/>
            {/* 페이지이용 권한 제한 */}
            <Route path='unauthorized' element={<Unauthorized/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
