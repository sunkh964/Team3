import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Qnaupdate.css';

const Qupldate = () => {
  const navigate=useNavigate();

  //세션에 있는 로그인 정보를 받아 옴
  const sessionLoginInfo =  window.sessionStorage.getItem('loginInfo');
  const loginInfo = JSON.parse(sessionLoginInfo);

  const [qInfo, setQInfo]=useState({
    memNum:loginInfo.memNum,
    qTitle:'',
    qContent:''
  });

function update(){
  axios.post('/q/qupdate', qInfo)
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
    // <div className='sample5'>
    //   <table>
    //     <thead className='blockquote'>
    //       <tr>
    //         <td>제목</td>
    //         <td><input type='text' name='qtitle' onChange={(e)=>{chengeQ(e)}}/></td>
    //       </tr>
    //       <tr>
    //         <td>문의 내용</td>
    //         <td><textarea type='textarea' name='qcontent' onChange={(e)=>{chengeQ(e)}}/></td>
    //       </tr>
    //     </thead>
    //   </table>
    //     <button className='cite' onClick={(e)=>{update()}}>글 등록</button>
    // </div>
  
  <div class="container2">
    <div class="member-container">
      <div class="header1">
        <div>제목</div>
      </div>
      <div class="user-info">
        <div class="user-info-email">
          <div><input type='text' name='qtitle' onChange={(e)=>{chengeQ(e)}}/></div>
        </div>
        <div>
          <div className='qna-div'>문의 내용</div>
        </div>
        <div class="user-info-name">
          <div><textarea type='textarea' name='qcontent' onChange={(e)=>{chengeQ(e)}}/></div>
          
        </div>
      </div>
      <div>
        <button type='button' class="custom-btn btn-6" onClick={(e)=>{update()}}><span>글 등록</span></button>
      </div>
    </div>
  </div>

  )
}

export default Qupldate