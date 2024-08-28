import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Qupldate = () => {
  const navigate=useNavigate();

    //세션에 있는 로그인 정보를 받아 옴
    const sessionLoginInfo =  window.sessionStorage.getItem('loginInfo');
    const loginInfo = JSON.parse(sessionLoginInfo);

const [qInfo, setQInfo]=useState({
  memId:loginInfo.memId,
  qNum:'',
  qTitle:'',
  qContent:''
});

function update(){
  axios.post('/mypage/qupdate', qInfo)
  .then((res)=>{
    alert('문의가 성공적으로 되었습니다.');
    setQInfo(res.data);
    navigate('/mypage/qna');
  })
  .catch((error)=>{
    alert('등록 오류');
    console.log(error);
  });
}

function chengeQ(e){
  setQInfo({
    ...qInfo,
    [e.target.name]:e.target.value
  });
}

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>제목</td>
            <td><input type='text' name='qtitle' onChange={(e)=>{chengeQ(e)}}/></td>
          </tr>
          <tr>
            <td>문의 내용</td>
            <td><textarea type='textarea' name='qcontent' onChange={(e)=>{chengeQ(e)}}/></td>
          </tr>
        </thead>
      </table>
        <button onClick={(e)=>{update()}}>글 등록</button>
    </div>
  )
}

export default Qupldate