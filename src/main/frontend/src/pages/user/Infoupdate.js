import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Infoupdate.css';

const Infoupdate = () => {

  const {memId}=useParams();


  // 수정 시 빈값을 채워줄 데이터
  const [info, setInfo]=useState({
    memId:memId,
    memName:'',
    memTel:'',
    memAddr:''
  });

  function chengeInfo(e){
    setInfo({
      ...info,
      [e.target.name]:e.target.value
    });
  }

  useEffect(()=>{
    axios.get(`/member/infoupdate/${memId}`)
    .then((res)=>{
      setInfo(res.data);
      setInfo({
        ...info,
        memName:res.data.memName,
        memTel:res.data.memTel,
        memAddr:res.data.memAddr
      });
    })
    .catch((error)=>{
      alert('오류1번')
      console.log(error);
    });
  }, [])

  function updateInfo(){
    axios.put('/member/update', info)
    .then((res)=>{
      alert('정보가수정되었습니다')
    })
    .catch((error)=>{
      alert('오류2')
      console.log(error);
    });
  }

  return (
    <div>
      <div className='info-head'>
        <span>개인정보수정</span>
        <table className='info-thead'>
          <thead className='infoT'>
            <tr>
              <td>이름</td>
              <td>{info.memName}</td>
            </tr>
            <tr>
              <td>현재 주소</td>
              <td>{info.memAddr}</td>
            </tr>
            <tr>
              <td>주소 변경</td>
              <td><input type='text' name='memAddr' onChange={(e)=>{chengeInfo(e)}}></input></td>
            </tr>
            <tr>
              <td>현재 전화번호</td>
              <td>{info.memTel}</td>
            </tr>
            <tr>
              <td>전화번호 변경</td>
              <td><input type='text' name='memTel' onChange={(e)=>{chengeInfo(e)}}/></td>
            </tr>
          </thead>
        </table>
        <button type='button' className='info-button' onClick={(e)=>{updateInfo()}}>변경하기</button>
      </div>
    </div>
  )
}

export default Infoupdate