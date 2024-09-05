import React, { useEffect, useState } from 'react';
import './History.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const { patieNum } = useParams();

  // 진료 이력 리스트 담을 빈 배열
  const [hisList, setHisList] = useState([]);

  // 진료 이력 리스트 불러오기
  useEffect(() => {
    axios.get(`/rec/selectHis/${patieNum}`)
      .then((res) => {
        setHisList(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [patieNum]);

  return (
    <div className='historyDiv'>
      <div className='hisTitle'>
        {hisList.length > 0 ? hisList[0]?.patieVO?.patieName + ' 님 진료 이력' : '진료 이력 없음'}
        {hisList.length > 0 && (
        <div className='topContent'>
          <div className='con conTop'>
            <div><span>기본 정보</span></div>
          </div>
          <div className='con'>
            <div><span>이름 :</span> {hisList[0]?.patieVO?.patieName || null}</div>
            <div><span>생년월일 :</span> {hisList[0]?.patieVO?.patieBirth || null}</div>
          </div>
          <div className='con'>
            <div><span>주소 :</span> {hisList[0]?.patieVO?.patieAddr || null}</div>
            <div><span>연락처 :</span> {hisList[0]?.patieVO?.patieTel || null}</div>
          </div>
        </div>
      )}
      </div>

      

      {/* 진료 이력 리스트 */}
      {hisList.map((his, i) => {
        const staff = his.staffVO?.staffName;
        return (
          <div className='hisContent' key={i} onClick={() => { navigate(`/admin/reviseChart/${patieNum}/${his.recNum}`) }}>
            <div className='con conTop'>
              <div><span>진료 번호 :</span> {his.recNum || null}</div>
            </div>
            <div className='con'>
              <div><span>접수 시간 :</span> {his.recDate || null}</div>
              <div><span>예약 여부 :</span> {his.isRec || null}</div>
            </div>
            <div className='con'>
              <div><span>진료 부서 :</span> {his.staffVO?.part?.partName || null}</div>
              <div><span>담당의 :</span> {staff || null}</div>
            </div>
            <div className='con'>
              <div><span>증상 :</span> {his.recDetail || null}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
