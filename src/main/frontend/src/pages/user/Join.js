import React, { useRef, useState } from 'react'
import './Join.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { joinValidate } from './joinValidate';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Join = () => {

    //daum 주소 api 팝업창을 띄우기 위한 함수 선언
    const open = useDaumPostcodePopup();

      //주소 검색 팝업창이 닫힐 때 실행되는 함수
  function handleComplete(data){
    //도로명주소
    console.log(data.roadAddress);

    //input 태그에 검색한 내용 넣어주기!
    setJoinData({
      ...joinData,
      memAddr : data.roadAddress
    });
  }

      //주소 검색 버튼 클릭 시 실행되는 함수
  function handleClick(){
    open({onComplete : handleComplete});
  }

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

// 인풋 작성시 올바르지 않을때 나오는 메세지
  const [validationErrors, setValidationErrors] = useState({});
// 유효성 검사 함수
const validateId = (id) => /^[a-zA-Z]{4,12}$/.test(id);
// 비밀번호
const validatePassword = (password) => /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,12}$/.test(password);
// 생년 월일
const validateBirth = (birth) => /^\d{6}$/.test(birth);

  //회원가입 버튼 클릭 시 insert 쿼리 실행하러 가기
  function join(){

    const errors = {};

    // ID 유효성 검사
    if (!validateId(joinData.memId)) {
      errors.memId = 'ID는 4~12자 영문만 포함해야 합니다.';
    }

    // 비밀번호 유효성 검사
    if (!validatePassword(joinData.memPw)) {
      errors.memPw = '비밀번호는 4~12자 영문 소문자와 숫자만 포함해야 합니다.';
    }

    // 생년월일 유효성 검사
    if (!validateBirth(joinData.memBirth)) {
      errors.memBirth = '생년월일은 6자리 숫자여야 합니다.';
    }

    // 유효성 검사 오류가 있으면 오류 메시지를 설정하고, 함수 종료
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);

      return;
    }
    if (!joinData.memTel || !joinData.memAddr){
      alert('모든 정보를 입력해주세요.');
      return;
    }





  axios.post('/member/join', joinData, joinData1)
  .then((res)=>{
    alert('회원가입')
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

  const { name, value } = e.target;
    
  // 실시간 유효성 검사
  let errors = {};

  switch (name) {
    case 'memId':
      if (!validateId(value)) {
        errors.memId = 'ID는 4~12자 영문만 포함해야 합니다.';
      }
      break;
    case 'memPw':
      if (!validatePassword(value)) {
        errors.memPw = '비밀번호는 4~12자 영문 소문자와 숫자만 포함해야 합니다.';
      }
      break;
    case 'memBirth':
      if (!validateBirth(value)) {
        errors.memBirth = '생년월일은 6자리 숫자여야 합니다.';
      }
      break;
    default:
      break;
  }

  setValidationErrors((prevErrors) => ({
    ...prevErrors,
    ...errors
  }));

  setJoinData({
    ...joinData,
    [e.target.name]:e.target.value
  })
  setJoinData1({
    ...joinData1,
    [e.target.name]:e.target.value
  })

    // 실시간 유효성 검사를 통해 오류 메시지 제거
    if (errors[name] === undefined) {
      setValidationErrors((prevErrors) => {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      });
    }

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
          <input type='text' name='memBirth'
          onChange={(e)=>{changeJoinData(e)}} />
          {validationErrors.memBirth && <div className="error-message">{validationErrors.memBirth}</div>}
        </div>
        <div class="user-info-email">
          <div>* 아이디<button className='user-button' type='button' onClick={(e)=>{checkId(e)}}>중복 확인</button>
          </div>
          <input type='text' name='memId' className='button-td' onChange={(e)=>{changeJoinData(e)}} />
          {validationErrors.memId && <div className="error-message">{validationErrors.memId}
            </div>}
        </div>
        <div class="user-info-email">
          <div>* 비밀번호</div>
          <input type='password' name='memPw' onChange={(e)=>{changeJoinData(e)}}/>
          {validationErrors.memPw && <div className="error-message">{validationErrors.memPw}</div>}
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
          
          <input name='memAddr' onClick={handleClick}  value={joinData.memAddr} onChange={(e)=>{changeJoinData(e)}} />
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