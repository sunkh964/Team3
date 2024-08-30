import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Qdetail = () => {
  const navigate=useNavigate();
    //세션에 있는 로그인 정보를 받아 옴
    const sessionLoginInfo =  window.sessionStorage.getItem('loginInfo');
    const loginInfo = JSON.parse(sessionLoginInfo);

    // 정보받아오기
    const {qNum}=useParams();

    const [q, setQ]=useState({});

  // 문의 답변
  const [reply, setReply]=useState({});

  console.log(reply);

    // 댓글 등록시 가져가야하는 데이터
  const [replyData, setReplyData]=useState({
    aContent:'',
    aNum:loginInfo.qNum,
    aDate:'',
    qNum:qNum
  });

  
  useEffect(()=>{
    axios.get(`/q/qdetail/${qNum}`)
    .then((res)=>{
      console.log(res.data);
      setQ(res.data);
    })
    .catch((error)=>{
      alert('조회 오류')
      console.log(error);
    });
  }, []);
  
  // 답변
  useEffect(()=>{
    axios.get(`/q/reply/${qNum}`)
    .then((res)=>{
      console.log(res.data);
      setReply(res.data);
    })
    .catch((error)=>{
      alert('답변 조회오류');
      console.log(error);
    });
  }, []);

  // 답변 등록하기
  function regReply(){
    axios.post('q/insert', replyData)
    .then((res)=>{
      alert('답변 완료');
      setReplyData({
        ...replyData,
        aContent:''
      });
    })
    .catch((error)=>{
      alert('답변 등록오류');
      console.log(error);
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>문의 번호</td>
            <td>{q.qnum}</td>
          </tr>
          <tr>
            <td>날짜</td>
            <td>{q.qdate}</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>{q.qtitle}</td>
          </tr>
          <tr>
            <td>문의 내용</td>
            <td>{q.qcontent}</td>
          </tr>
          <tr>
            <td>{reply.acontent}</td>
          </tr>
        </thead>
      </table>

    </div>
  )
}

export default Qdetail