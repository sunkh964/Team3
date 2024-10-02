import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css';

const Login = ({setLoginInfo, loginInfo}) => {
  const navigate=useNavigate();

  // 로그인 성공 실패 여부
  const [isLogin, setIsLogin]=useState(false);

  // 입력한 id, pw를 저장하는 변수
  const [loginData, setLoginData]=useState({
    memId: '',
    memPw:'',
  });

    // 스태프가  입력한 id, pw를 저장하는 변수
    const [loginStaff, setLoginStaff]=useState({
      staffId: '',
      staffPw:''
    });

  // 입력한 id, pw를 loginData에 저장하는 함수
  function changeLoginData(e){
    setLoginData({
      ...loginData,
      [e.target.name]:e.target.value
    });
  }

    // 입력한 스태프의 id, pw를 loginData에 저장하는 함수
    function changeLoginData2(e){
      setLoginStaff({
        ...loginStaff,
        [e.target.name]:e.target.value
      });
    }

  function login(){
    //id,pw 입력 여부 확인
    if(loginData.memId == '' || loginData.memPw == ''){
      alert('정보를 입력해주세요')
      return ;
    }

    axios.post('/member/login', loginData)
    .then((res)=>{
      if(res.data==''){
        setIsLogin(false);
        alert('로그인 실패')
      }
      else{     // 로그인 성공시
        setIsLogin(true);
        const loginInfo={
          memId:res.data.memId,
          memName:res.data.memName,
          memNum:res.data.memNum,
          patieNum:res.data.patie.patieNum
        };
        alert('로그인 성공')

        

        //로그인 정보를 가진 객체를 문자열 형태로 변환
        //객체 -> 문자열로 변환한 데이터를 JSON 데이터로 부른다.
        const json_loginInfo = JSON.stringify(loginInfo);
        //sessionStoragy에 로그인한 회원의 아이디, 이름, 권한정보 등록
        window.sessionStorage.setItem('loginInfo', json_loginInfo);
        //로그인 정보를 저장
        setLoginInfo(loginInfo);

        navigate('/');
      }
    })
    .catch((error)=>{
      console.log(error);
    });}

// 스태프 로그인 함수
function login2(){
  //id,pw 입력 여부 확인
  if(loginStaff.staffId == '' || loginStaff.staffPw == ''){
    alert('정보를 입력해주세요')
    return ;
  }

  axios.post('/staff/loginStaff', loginStaff)
  .then((res)=>{
    if(res.data==''){
      setIsLogin(false);
      alert('로그인 실패')
    }
    else{     // 로그인 성공시
      setIsLogin(true);
      const loginInfo={
        staffId:res.data.staffId,
        staffPw:res.data.staffPw,
        staffRole:res.data.staffRole,
        staffName:res.data.staffName,
        staffNum:res.data.staffNum
      };
      alert('로그인 성공')
      //로그인 정보를 가진 객체를 문자열 형태로 변환
      //객체 -> 문자열로 변환한 데이터를 JSON 데이터로 부른다.
      const json_loginInfo = JSON.stringify(loginInfo);
      //sessionStoragy에 로그인한 회원의 아이디, 이름, 권한정보 등록
      window.sessionStorage.setItem('loginInfo', json_loginInfo);
      //로그인 정보를 저장
      setLoginInfo(loginInfo);
      navigate('/admin')
    }
  })
  .catch((error)=>{
    console.log(error);
  });
}

  return (
    <div className='login'>
      <div>
        <div class="box">
          <div className='login-div'>일반 회원</div>
          <input input type='text' name='memId' placeholder='Input your ID' onChange={(e) => {changeLoginData(e)}}/>
          <input type='password'  placeholder='Input your Password' name='memPw' onChange={(e) => {changeLoginData(e)}} />
          <button type='button' onClick={(e) => {login()}} className='button-div'>로그인</button>
        </div>
        
              <div class="box1">
                <div className='login-div'>직원 전용</div>
          <input type='text' name='staffId' placeholder='Input your ID' onChange={(e) => {changeLoginData2(e)}}/>
          <input type='password'  placeholder='Input your Password' name='staffPw' onChange={(e) => {changeLoginData2(e)}} />
          <button type='button' onClick={(e) => {login2()}} className='button-div'>로그인</button>
        </div>
      </div>

      <div className='login-foot'>
        <div>· 비회원 이용
          <div className='login-f-content'><button>진료예약 바로가기</button></div>
        </div>
        <div>
          · 아이디 / 비밀번호 찾기
          <div className='login-f-content'>
            <button className='idSelect'>아이디 찾기</button>
            <button>비밀번호 찾기</button>
          </div>
        </div>
        <div>
          · 회원가입하기
          <div className='login-f-content'><button >회원가입</button></div>
        </div>
      </div>
    </div>
  );
}


export default Login