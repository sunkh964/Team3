import React, { useEffect, useRef, useState} from 'react'
import './UserHome.css'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
   const navigate= useNavigate();

  //조회된 게시글 목록을 저장할 변수
   const [boardList, setBoardList] = useState([]);

   //게시글 목록 조회
   useEffect(() => {
   axios.get('/board/list')
   .then((res) => {
   setBoardList(res.data);
   })
   .catch((error) => {
   alert('게시글 목록 조회 오류!');
   console.log(error);
   });
}, []);

// ============ 이미지 ===============//
const [showImg, setShowImage] = useState(0);

const img = [
   'http://localhost:8080/images/img_introRolling02.jpg',
   'http://localhost:8080/images/FIL_20240719140842069Pf20.jpg',
   'http://localhost:8080/images/banner3.jpg'
]
const img2 = [
   'http://localhost:8080/images/hos_banner_waifu2x_art_noise1_scale.png',
   'http://localhost:8080/images/FIL_20240719140842069Pf20.jpg',
   'http://localhost:8080/images/banner3.jpg'
]

// 이미지 이동
const prev = () => {
   setShowImage((prev) => (prev === 0 ? img.length - 1 : prev - 1));
};
const next = () => {
   setShowImage((prev) => (prev === img.length - 1 ? 0 : prev + 1));
};

 // li 자동변경
const liChange = (i) =>{
   setShowImage(i);
}

   return (
   <div className='home-div'>
      <div className='img'> 
         <img src={img[showImg]} />
         <img className='img2' src={img2[showImg]} />
         <div>
            <ul className='img-list'>
               {
                  img.map((img, i) => {
                     return(
                        <li key={i} className={`img-item ${i == showImg ? 'active' : ''}`}
                        onClick={()=>{liChange(i)}}></li>
                     );
                  })
               }
            </ul>
         </div>
         <div className='img-btn'>
            <i onClick={()=>{prev()}} className="bi bi-chevron-double-left"></i>
            <i onClick={()=>{next()}} className="bi bi-chevron-double-right"></i>
         </div>
      </div>

      <div className='quick'>
         <div>
            <div className='qTitle'>Quick Menu</div>
            <div className='quickList'>
               <div className='qMenu'>
                  <div className='qIcon'><img src={'http://localhost:8080/images/quick1.png'}/></div>
                  <div>제증명서류 발급</div>
               </div>
               <div className='qMenu'>
                  <div className='qIcon'><img src={'http://localhost:8080/images/quick2.png'}/></div>
                  <div>의무기록사본 발급</div>
               </div>
               <div className='qMenu'>
                  <div className='qIcon'><img src={'http://localhost:8080/images/quick4.png'}/></div>
                  <div>주요 전화번호</div>
               </div>
               <div className='qMenu'>
                  <div className='qIcon'><img src={'http://localhost:8080/images/quick5.png'}/></div>
                  <div>주차안내</div>
               </div>
               <div className='qMenu'>
                  <div className='qIcon'><img src={'http://localhost:8080/images/quick3.png'}/></div>
                  <div>채용정보시스템</div>
               </div>
            </div>
         </div>
      </div>

      <div className='empty'></div>

      <div className='content'>
         <div className='home3'>
            <div className='home4'>
               <div className='home1' onClick={(e)=>{navigate('/notice')}} >공지사항</div>
               <div className='icon' onClick={(e)=>{navigate('/notice')}}><i className="bi bi-chat-left-dots"></i></div>
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
               <div>원내배치도</div>
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