import axios from 'axios';
import './ReservSelect.css'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ReservSelect = () => {
  const navigate = useNavigate();

  // 로그인 정보 확인
  const sessionLoginInfo = window.sessionStorage.getItem('loginInfo');
  const loginInfo = sessionLoginInfo ? JSON.parse(sessionLoginInfo) : null;

  // 회원의 예약 리스트 저장
  const [resList, setResList] = useState([]);

  useEffect(()=>{
    axios.get(`/rec/selectIdRec/${loginInfo.patieNum}`)
    .then((res) =>{
      setResList(res.data);
      console.log(res.data);
    })
    .catch((error) =>{console.log(error);})
  },[]);

  return (
    <div className='resSelect'>
      <div>예약조회</div>
      <div className='explain'>
        <div>√ 예약내역 참고사항</div>
        <ul>
          <li><span>온라인으로 진행하신 진료예약은 임시예약</span>으로, 담당자가 고객님께 전화드려 예약시간을 조정한 후 확정해 드리므로, <br/>
          <span>'예약확인 전화/문자'를 받지 못하신 경우 지정하신 날짜/시간이 변경될 수 있는 점 </span>
          참고 부탁드리겠습니다.
          </li>
          <li>예약 확정 이후 진료예약 변경 시, 위 사항과 동일하게 연락을 드릴 예정입니다.</li>
        </ul>
        <div>√ 예약 문의 (☎052-123-4567)</div>
        <ul>
          <li>홈페이지에서는 '홈페이지 예약접수'와 '예약완료내역' 확인만 가능하므로, <br /> 이전 병원예약 내역은 본원 원무팀 (☎052-123-4567) 으로 문의 바랍니다. </li>
          <li>이외 관련 문의사항이 있으신 경우 또한 본원 원무팀으로 연락 바랍니다. </li>
        </ul>
      </div>
      <div className='resSelect-list'>
        <div><b>[{loginInfo.memName}]</b> 님 예약 내역</div>
        {
        resList.map((res,i)=>{
          return(
            <div className='resSelectTable'>
              <table className='resSelect-table'>
                <colgroup>
                  <col width='5%' />
                  <col width='30%' />
                  <col width='15%' />
                  <col width='30%' />
                  <col width='10%' />
                  <col width='10%' />
                </colgroup>
                <tr>
                  <td rowSpan={2}>{i+1}</td>
                  <td rowSpan={2}>{res.recDate}</td>
                  <td>{res.staffVO.part.partName}</td>
                  <td rowSpan={2}>{res.recDetail}</td>
                  <td rowSpan={2}>
                    <button className='resSelBtn'>수정</button></td>
                  <td rowSpan={2}>
                    <button className='resSelBtn1'>삭제</button></td>
                </tr>
                <tr>
                  <td>{res.staffVO.staffName}</td>
                </tr>
              </table>
            </div>
          );
        })
      }
      </div>
     
    </div>
  )
}

export default ReservSelect