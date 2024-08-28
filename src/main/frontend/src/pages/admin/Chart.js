import React, { useEffect, useState } from 'react';
import './Chart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chart = () => {
  const navigate = useNavigate();

  // 당일예약 환자 넣을 빈 배열
  const [resMemList, setResMemList]=useState([]);
  // 진료 환자 넣을 빈 배열
  const [nowResMem, setNowResMem]=useState([]);

  // 당일예약 환자 리스트
  useEffect(()=>{
    axios.get('/chart/chartList')
    .then((res)=>{
      console.log(res.data) 
      setResMemList(res.data)
    })
    .catch((error)=>{console.log(error)})
  },[])

  // 진료 환자 리스트
  useEffect(()=>{
    axios.get('/chart/getIsNowMemChart')
    .then((res)=>{
      console.log(res.data) 
      setNowResMem(res.data)
    })
    .catch((error)=>{console.log(error)})
  },[])

  // 당일 예약 환자 -> 진료 환자로 변경
  function goIsNow(chartNum){
    if(window.confirm('진료환자로 변경하시겠습니까?')){
      alert('진료환자로 변경되었습니다.')
      console.log(chartNum)
      axios.put('/chart/changeIsNow', {chartNum})
      .then((res)=>{
        window.location.reload()
      })
      .catch((error)=>{})
    }else{
      alert('변경이 취소되었습니다.')
    }
  }

  // 진료환자 환자 삭제
  function delIsNow(chartNum){
    if(window.confirm('진료환자를 지우겠습니까?')){
      alert('정상 처리되었습니다.')
      axios.put('/chart/delIsNow', {chartNum})
      .then((res)=>{
        window.location.reload()
      })
      .catch((error)=>{console.log(error)})
    }else{
      alert('취소되었습니다.')
    }
  }

  return (
    <div className='chart'>
      <div className='title'>환자 차트</div>

      <div className='mainChart'>
        <div className='chartLeft'>

          <div className='todayReg'>
            <div className='todayTop'>
              <p>당일 예약 환자</p>
              <button onClick={()=>{navigate('/admin/addChart')}}>추가</button>
            </div>

            {
              resMemList.map((resMem, i) => {
                const member = resMem.resMemList[0]?.memberList[0];
                const chartNum = resMem.chartNum;
                return (
                  <div className='todayRegContent' key={i}>
                    <div className='divF'>
                      <div className='clickDetail' onClick={()=>navigate(`/admin/history/${member.memNum}`)}>이름 : {member ? member.memName : null}</div>
                      <div>생년월일 : {member ? member.memBirth : null}</div>
                      <div>성별: {member ? member.memGen : null}</div>
                    </div>
                    <div className='divFSec'>
                      <div>연락처 : {member ? member.memTel : null}</div>
                      <div>
                        <span>수정</span>
                        <span>삭제</span>
                        <button onClick={()=>{goIsNow(chartNum)}}>진료환자 등록</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            

          </div>
          
          <div className='adminChat'>
            <p>단체 채팅</p>
            <div>
              <div className='messageContent'>
                <div className='message'>
                  memRole : 메시지 <span>10:17</span>
                </div>
              </div>
              <div className='sent'>
                <input type='text'/>
                <button>전송</button>
              </div>
            </div>
          </div>
        </div>

        <div className='medTreat'>
          <div className='medTop'><p>진료 환자</p></div>
          <div className='trContent'>

            {
              nowResMem.map((resMem, i)=>{
                const member = resMem.resMemList[0]?.memberList[0];
                const resMember = resMem.resMemList[0]
                const chartNum = resMem.chartNum
                return(
                  <div className='treatContent' key={i}>
                    <div className='divTrF'>
                      <div>예약번호 : {resMember? resMember.resNum: null}</div>
                    </div>
                    <div className='divTrF'>
                      <div className='clickDetail' onClick={()=>{navigate(`/admin/history/${member.memNum}`)}}>이름 : {member? member.memName:null} </div>
                      <div>생년월일 : {member? member.memBirth:null}</div>
                      <div>성별: {member? member.memGen:null}</div>
                    </div>
                    <div className='divTrT'>
                      <div>진료 부서 : {resMember? resMember.partList[0].partName:null}</div>
                      <div>담당의 : {resMember? resMember.staffList[0].staffName:null} </div>
                    </div>
                    
                    <div className='botBut'>
                        <button>수정</button>
                        <button onClick={()=>{delIsNow(chartNum)}}>환자 삭제</button>
                      </div>
                  </div>
                )
              })
            }
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
