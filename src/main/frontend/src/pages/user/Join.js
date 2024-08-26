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

  // 버튼 활성화 여부 state 변수
  const [isDisabled,setisDisabled ]=useState(true);


  //회원가입 버튼 클릭 시 insert 쿼리 실행하러 가기
  function join(){
  axios.post('/member/join', joinData)
  .then((res)=>{
    alert('회원가입')
    setJoinData(res.data);
    navigate('/')
  })
  .catch((error)=>{
    console.log(error);
    alert('실패')
  });
  }

const [valid_result, setValiResult]=useState(false);


function changeJoinData(e){
  setJoinData({
    ...joinData,
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
    <div className='join-div'>
      <table className='join-table'>
        <thead>
          <tr>
            <td>이름</td>
            <td><input type='text' name='memName' onChange={(e)=>{changeJoinData(e)}}></input></td>
          </tr>
          <tr>
            <td>생년월일</td>
            <td><input type='text' name='memBirth' onChange={(e)=>{changeJoinData(e)}}/></td>
          </tr>
          <tr>
            <td>아이디</td>
            <td><input type='text' name='memId' onChange={(e)=>{changeJoinData(e)}}></input></td>
            <td><button type='button' onClick={(e)=>{checkId()}}>중복 확인</button></td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td><input type='password' name='memPw' onChange={(e)=>{changeJoinData(e)}}></input>
            </td>
          </tr>
          <tr>
            <td>비밀번호 확인</td>
            <td><input type='password'></input></td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td><input type='text' name='memTel' onChange={(e)=>{changeJoinData(e)}}/></td>
          </tr>
          <tr>
            <td>주소</td>
            <td><input type='text' name='memAddr' onChange={(e)=>{changeJoinData(e)}}/></td>
          </tr>
          <tr>
            <td>성별</td>
            <td>남<input type='radio' name='memGen' checked={joinData.memGen=='male'} value="male" onChange={(e)=>{changeJoinData(e)}}/>여
            <input type='radio' name='memGen' checked={joinData.memGen=='female'} value="female" onChange={(e)=>{changeJoinData(e)}}/></td>
          </tr>
        </thead>
      </table>
      <button type='button' disabled={isDisabled} onClick={(e)=>{join()}}>회원가입</button>
    </div>
  )
}

export default Join