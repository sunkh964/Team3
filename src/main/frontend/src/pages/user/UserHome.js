import React, { useEffect, useState } from 'react'
import './UserHome.css'
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'

const UserHome = () => {
   const navigate= useNavigate();
=======
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
   const navigate=useNavigate();
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


>>>>>>> nohk
   return (
   <div className='home-div'>
      <div className='img'> <img src={'http://localhost:8080/images/hos_banner_waifu2x_art_noise1_scale.png'} /> </div>

      <div className='content'>
         <div className='home3'>
            <div className='home4'>
               <div className='home1' onClick={(e)=>{navigate('/notice')}} >공지사항</div>
               <div className='icon' onClick={(e)=>{navigate('/notice')}}><i class="bi bi-chat-left-dots"></i></div>
            </div>
            <div className='home2'>
               <table>
                  {
                     boardList.map((board, i)=>{
                        return(
                           <tr key={i}>
                              <td>{i+1}</td>
                              <td>{board.boardTitle}</td>
                              <td>{board.boardDate}</td>
                           </tr>
                        );
                     })
                  }
               </table>
            </div>
         </div>
         <div className='content-list'>
            <div className='content-list1'>
               <div>진료안내</div>
               <div>
                  <div>과/의료진 안내</div>
                  <div>예약 안내</div>
               </div>
            </div>
            <div className='content-list2'>
               <div>이용안내</div>
               <div>
               <div>시설 안내</div>
               <div>증명서발급</div>
               </div>
            </div>
            <div className='content-list3'>
               <div>진료예약</div>
               <div>
               <div onClick={()=>{navigate('/reserv')}}>예약 하기</div>
               <div>예약 변경</div>
               </div>
            </div>
            <div className='content-list4'>
               <div>문의하기</div>
            </div>
         </div>
      </div>
   </div>
)
}

export default UserHome