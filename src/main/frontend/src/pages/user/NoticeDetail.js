import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const NoticeDetail = () => {
  const {boardNum}=useParams();

  // 조회한 상세정보 데이터를 저장할 변수
  const [notice, setNotice]=useState({});

  // 상세정보 조회
  useEffect(()=>{
    axios.get(`/NoticeDetail/${boardNum}`)
    .then((res)=>{
      setNotice(res.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }, []);
  return (
    <div>
      <div>{notice.boardNum}</div>
      <div>{notice.boardTitle}</div>
      <div>{notice.boardContent}</div>
      <div>{notice.boardDate}</div>
    </div>
  )
}

export default NoticeDetail