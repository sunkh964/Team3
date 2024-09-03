import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Notice = () => {
  //조회된 게시글 목록을 저장할 변수
  const [boardList, setBoardList] = useState([]);

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
      <div>공지사항</div>
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>제목</td>
            <td>날짜</td>
          </tr>
        </thead>
        <tbody>
          {
            boardList.map((board, i)=>{
              return(
                <tr key={i}>
                  <td>{board.boardNum}</td>
                  <td>{board.boardTitle}</td>
                  <td>{board.boardDate}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
    
  )
}

export default Notice