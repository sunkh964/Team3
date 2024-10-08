import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Qna.css';

const Qna = () => {
  const navigate=useNavigate();
// 문의 번호 불러오기
  const {qNum}=useParams();

  //조회된 게시글 목록을 저장할 변수
  const [qnaList, setQnaList]=useState([]);

  // 자바에서 가져온 페이지 정보
  const [pageInfo, setPageInfo]=useState({});

  //세션에 있는 로그인 정보를 받아 옴
  const sessionLoginInfo =  window.sessionStorage.getItem('loginInfo');
  const loginInfo = JSON.parse(sessionLoginInfo);
  
  // 문의한 목록 조회
  useEffect(()=>{
    axios.get(`/q/list/${loginInfo.memNum}`)
    .then((res)=>{
      console.log(res.data)
      setQnaList(res.data);
      setPageInfo(res.data);
    })
    .catch((error)=>{
      alert('문의함 목록 조회 오류')
      console.log(error);
    });
  }, []);

  return (
    <div className='Qdiv'>
      <div className='q-text'>1:1 문의하기</div>
      <div className='Q1'>
        <table>
          <thead >
            <tr className='Q2'>
              <td>No</td>
              <td>제목</td>
              <td>작성 날짜</td>
            </tr>
          </thead>
          <tbody class="tbl-content">
          {
            qnaList.map((q, i)=>{
              return(
                <tr key={i} className='Q' onClick={(e)=>{navigate(`/mypage/qdetail/${q.qnum}`)}}>
                  <td>{i+1}</td>
                  <td>{q.qtitle}</td>
                  <td>{q.qdate}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
      <div><button type='button' className='btn-6' onClick={(e)=>{navigate(`/mypage/qupdate/${qnaList.memNum}`)}}><span>문의작성</span></button></div>
      </div>

  )
}

export default Qna