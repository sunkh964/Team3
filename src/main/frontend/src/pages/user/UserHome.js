import React from 'react'
import './UserHome.css'
import { useNavigate } from 'react-router-dom'

const UserHome = () => {
   const navigate= useNavigate();
   return (
   <div className='home-div'>
      <div className='img'> <img src={'http://localhost:8080/images/hos_banner_waifu2x_art_noise1_scale.png'} /> </div>

      <div className='content'>
         <div>
            <div>게시판/공지</div>
            <div>내용</div>
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