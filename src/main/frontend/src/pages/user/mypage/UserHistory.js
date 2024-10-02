import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserHistory.css';

const UserHistory = () => {
  const { memNum } = useParams();

  // 진료 이력 리스트 담을 빈 배열
  const [hisList, setHisList] = useState([]);

  // 진료 이력 리스트 불러오기
  useEffect(() => {
    axios.get(`/history/selectHis/${memNum}`)
      .then((res) => {
        console.log(res.data);
        setHisList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [memNum]);

  return (
    <div className='Qdiv'>
      {hisList.map((his, i) => {
        const res=his.resList[0]
        const part=his.partList[0]
        const staff=his.staffList[0]
        return(
        <div key={i} className='user1'>
          <div className='user2'>
            <div className='user3'>진료 이력 확인</div>
            <div><span>진료 이력 번호 :</span> {his.hisNum}</div>
          </div>
          <div>
            <div><span>차트 번호 :</span> {his.chartNum}</div>
            <div><span>예약 시간 :</span> {res?res.resTime:null}</div>
          </div>
          <div>
            <div><span>진료 부서 :</span> {part?part.partName:null}</div>
            <div><span>담당의 :</span> {staff?staff.staffName:null}</div>
          </div>
          <div>
            <div><span>병명 :</span> {his.illName}</div>
            <div><span>세부사항 :</span> {his.illDetail}</div>
          </div>
        </div>
        )
      })}
    </div>
  );
}

export default UserHistory;
