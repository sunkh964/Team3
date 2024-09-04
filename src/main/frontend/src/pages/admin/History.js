import React, { useEffect, useState } from 'react'
import './History.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { hi } from 'date-fns/locale';

const History = () => {
  const navigate= useNavigate();
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
          const res = his.resList[0];
          const part = his.partList[0];
          return(
            <div className='hisContent' key={i} onClick={()=>{navigate(`/admin/reviseChart/${member?member.memName:null}/${his.chartNum}`)}}>
              <div className='con conTop'> 
                <div><span>진료 이력 번호 :</span> {his.hisNum} </div>
              </div>
              <div className='con'> 
                <div><span>차트 번호 :</span> {his.chartNum} </div> 
                <div><span>접수 시간 :</span> {res?res.resTime:null} </div>
              </div>

              <div className='con'> 
                <div><span>진료 부서 :</span> {part?part.partName:null} </div> 
                <div><span>담당의 :</span> {staff?staff.staffName:null}</div> 
              </div>

              <div className='con'> 
                <div><span>병명 :</span> {his.illName}</div> 
                <div><span>세부사항 :</span> {his.illDetail} </div> 
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default History