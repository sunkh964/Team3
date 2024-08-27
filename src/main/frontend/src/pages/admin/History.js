import React, { useEffect, useState } from 'react'
import './History.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const History = () => {
  const {memNum} = useParams();

  // 진료 이력 리스트 담을 빈 배열
  const [hisList, setHisList] = useState([])

  // 진료 이력 리스트 불러오기
  useEffect(()=>{
    axios.get(`/history/selectHis/${memNum}`)
    .then((res)=>{
      console.log(res.data)
      setHisList(res.data)
    })
    .catch((error)=>{console.log(error)})
  },[])
  return (
    <div className='historyDiv'>

      {
        hisList.map((his, i)=>{
          const name = his.memberList[0]?.memName
          return(
            <div className='hisTitle' key={i}> {name} 님 진료 이력</div>
          )
        })
      }

      {
        hisList.map((his,i)=>{
          const member = his.memberList[0];
          const staff = his.staffList[0];
          return(
            <div className='hisContent' key={i}>
              <div className='conTop'> 
                <div>진료 이력 번호 : {his.hisNum} </div>
                <div>차트 번호 : </div> 
                <div>진료 날짜 : </div>
              </div>

              <div className='conMid'> 
                <div>진료 부서 : </div> 
                <div>담당의 : {staff?staff.staffName:null}</div> 
              </div>

              <div className='conBot'> 
                <div>병명 : {his.illName}</div> 
                <div>세부사항 : {his.illDetail} </div> 
              </div>
              <button>수정</button>
            </div>
          )
        })
      }

    </div>
  )
}

export default History