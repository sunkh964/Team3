import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NotiUpdate.css'

const NotiUpdate = () => {
  //세션에 있는 로그인정보 받아오기
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginData = JSON.parse(sessionLoginInfo);    

  const navigate= useNavigate();
  const [boardInfo, setBoardInfo]=useState({
    boardTitle:'',
    boardContent:'',
    boardDate:'',
    staffNum:loginData.staffNum
  });

  function update(){
    axios.post('/board/content', boardInfo)
    .then((res)=>{
      setBoardInfo(res.data);
      alert('글 등록 완료');
      navigate('/notice')
    })
    .catch((error)=>{
      alert('글등록 오류');
      console.log(error);
    })
  }

  function changeBoard(e){
    setBoardInfo({
      ...boardInfo,
      [e.target.name]:e.target.value
    });
  }

  return (
  <div>
    <div className='no-up'>
      <div className='no-up1'>
        <input type="text" className='no-up2' placeholder="제목을 입력하세요" name='boardTitle' onChange={(e)=>{changeBoard(e)}}/>
        <span className='no-sp'></span>
      </div>
        <input type='textarea' placeholder="내용을 입력하세요" className='no-up3' name='boardContent' onChange={(e)=>{changeBoard(e)}}></input>
    <div className='buttons'>
      <button className='btn-hover color-1' type='button' onClick={(e)=>{update()}}>등록</button>
    </div>
    </div>
  </div>
  )
}

export default NotiUpdate