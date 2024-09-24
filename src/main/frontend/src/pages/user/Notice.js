import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Notice.css';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
  const navigate=useNavigate();
  //조회된 게시글 목록을 저장할 변수
  const [boardList, setBoardList] = useState([]);
  // 관리자 권한 여부
  const [isAdmin, setIsAdmin] = useState(true);
  const [showForm, setShowForm] = useState(false);

  //게시글 목록 조회
  useEffect(() => {
  axios.get('/board/list')
  .then((res) => {
  console.log(res.data)
  setBoardList(res.data);
  })
  .catch((error) => {
  alert('게시글 목록 조회 오류!');
  console.log(error);
  });
}, []);


  return (
    <div>
      <section class="notice">
  <div class="page-title">
        <div class="container0">
          
            <h3 className='noti'><div className='iconNoti'><i class="bi bi-clipboard-check"></i></div>공지사항</h3>
        </div>
    </div>
    <div id="board-list">
        <div class="container0">
            <table class="board-table">
                <thead>
                <tr>
                    <th scope="col" class="th-num">번호</th>
                    <th scope="col" class="th-title">제목</th>
                    <th scope="col" class="th-date">등록일</th>
                </tr>
                </thead>
                <tbody>
                {
                  boardList.map((board, i)=>{
                    return(
                      <tr key={i} className='Noti-map'>
                  <td>{i+1}</td>
                  <td onClick={(e)=>{navigate(`/NoticeDetail/${board.boardNum}`)}}>{board.boardTitle}</td>
                  <td>{board.boardDate}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className='buttons'>
        {isAdmin && (
                <button className='btn-hover color-1' onClick={() => setShowForm(!showForm)}>
                  {showForm ? navigate('/admin/NotiUpdate') : '공지사항 작성'}
                </button>
              )}
      </div>
    </div>
  </div>
</section>
    </div>
    
  )
}

export default Notice