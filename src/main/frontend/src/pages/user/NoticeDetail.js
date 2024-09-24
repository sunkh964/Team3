import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './NoticeDetail.css';

const NoticeDetail = () => {
  const {boardNum}=useParams();

  // 조회한 상세정보 데이터를 저장할 변수
  const [notice, setNotice]=useState({});

  // 상세정보 조회
  useEffect(()=>{
    axios.get(`/board/NoticeDetail/${boardNum}`)
    .then((res)=>{
      setNotice(res.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }, []);
  return (
    <div className='no-de-div'>
      <div>{notice.boardNum}</div>
      <blockquote>
  <p>{notice.boardTitle}</p>
  <p>{notice.boardContent}</p>
  <cite>&mdash; {notice.boardDate}</cite>
</blockquote>
    </div>
  )
}

export default NoticeDetail