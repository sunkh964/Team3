import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css';

const Login = ({setLoginInfo}) => {
  const navigate=useNavigate();

  // 로그인 성공 실패 여부
  const [isLogin, setIsLogin]=useState(false);

  // 입력한 id, pw를 저장하는 변수
  const [loginData, setLoginData]=useState({
    memId: '',
    memPw:''
  });

  // 입력한 id, pw를 loginData에 저장하는 함수
  function changeLoginData(e){
    setLoginData({
      ...loginData,
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
          memNum:res.data.memNum
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
    });



  }
  return (
    <div>
      <div className='login-div'>
        <div>아이디 <input type='text' name='memId' placeholder='Input your ID' onChange={(e) => {changeLoginData(e)}}></input></div>
        <div>비밀번호 <input type='password'  placeholder='Input your Password' name='memPw' onChange={(e) => {changeLoginData(e)}}></input></div>
        <button type='button' onClick={(e) => {login()}} className='button-div'>로그인</button>
      </div>
    </div>
  )
}

export default Login