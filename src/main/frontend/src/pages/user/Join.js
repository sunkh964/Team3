import React, { useRef, useState } from 'react'
import './Join.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { joinValidate } from './joinValidate';

const Join = () => {
  const navigate=useNavigate();
// 회원가입 시 가져갈 데이터
const [joinData, setJoinData]=useState({
  memId:'',
  memPw:'',
  memName:'',
  memTel:'',
  memAddr:'',
  memGen:'male',
  memBirth:''
});
// 회원가입 시  환자 데이터 가져가기
const [joinData1, setJoinData1]=useState({
  patieNum:'',
  patieName:'',
  patieTel:'',
  patieBirth:'',
  patieAddr:'male',
  patieGen:'',
  personalYN:''
});

  // 버튼 활성화 여부 state 변수
  const [isDisabled,setisDisabled ]=useState(true);


  //회원가입 버튼 클릭 시 insert 쿼리 실행하러 가기
  function join(){
  axios.post('/member/join', joinData, joinData1)
  .then((res)=>{
    alert('회원가입')
    console.log(setJoinData1);
    setJoinData(res.data);
    setJoinData1(res.data);
    navigate('/')
  })
  .catch((error)=>{
    console.log(error);
    alert('실패')
  });
  }

const [valid_result, setValiResult]=useState(false);

// 환자데이터와 일반 회원 데이터
function changeJoinData(e){
  setJoinData({
    ...joinData,
    [e.target.name]:e.target.value
  })
  setJoinData1({
    ...joinData1,
    [e.target.name]:e.target.value
  })
}

// 아이디 중복 확인 함수
function checkId(){
  if(joinData.memId==''){
    alert('아이디를 입력해 주세요');
    return;
  }
// id 값을 가지고 자바로 가서 중복확인 쿼리를 실행
  axios.get(`/member/checkId/${joinData.memId}`)
  .then((res)=>{
    const result=res.data;
    if(result){
      alert('ID 중복');
    }
    else{
      alert('사용가능');
    }
    if(!result){
      setisDisabled(false);
    }
  })
  .catch((error)=>{
    alert('오류');
    console.log(error);
  });
}



  return (
    <div class="container">
    <div class="member-container">
      <div class="header">
        <div>회원 가입을 위해</div>
        <div>정보를 입력해주세요</div>
      </div>
      <div class="user-info">
        <div class="user-info-email">
          <div>* 이름</div>
          <input type='text' name='memName' onChange={(e)=>{changeJoinData(e)}} />
        </div>
        <div class="user-info-email">
          <div>* 생년월일</div>
          <input type='text' name='memBirth' onChange={(e)=>{changeJoinData(e)}} />
        </div>
        <div class="user-info-email">
          <div>* 아이디<button className='user-button' type='button' onClick={(e)=>{checkId(e)}}>중복 확인</button></div>
          <input type='text' name='memId' className='button-td' onChange={(e)=>{changeJoinData(e)}} />
        </div>
        <div class="user-info-email">
          <div>* 비밀번호</div>
          <input type='password' name='memPw' onChange={(e)=>{changeJoinData(e)}}/>
        </div>
        <div class="user-info-email">
          <div>* 비밀번호 확인</div>
          <input type="password" />
        </div>
        <div class="user-info-email">
          <div>* 전화번호</div>
          <input type='text' name='memTel' onChange={(e)=>{changeJoinData(e)}}/>
        </div>
        <div class="user-info-email">
          <div>* 주소</div>
          <input name='memAddr' onChange={(e)=>{changeJoinData(e)}} />
        </div>
      </div>
      <div class="gender">
        <input type='radio' name='memGen' checked={joinData.memGen=='male'} value="male" onChange={(e)=>{changeJoinData(e)}}/>남
        <input type='radio' name='memGen' checked={joinData.memGen=='female'} value="female" onChange={(e)=>{changeJoinData(e)}}/>여
      </div>
      <div class="btn-join">
        <button type='button' class="btn-join" disabled={isDisabled} onClick={(e)=>{join()}}>가입하기</button>
      </div>
    </div>
  </div>
  )
}

export default Join