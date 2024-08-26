import React, { useEffect, useState } from 'react';
import './Chart.css';
import axios from 'axios';

const Chart = () => {
  // 환자리스트 넣을 빈 배열
  const [resMemList, setResMemList]=useState([]);
  const [nowResMem, setNowResMem]=useState([]);

  // 예약된 환자리스트 가져오기
  useEffect(()=>{
    axios.get('/chart/chartList')
    .then((res)=>{
      console.log(res.data) 
      setResMemList(res.data)
    })
    .catch((error)=>{console.log(error)})
  },[])

  useEffect(()=>{
    axios.get('/chart/getIsNowMemChart')
    .then((res)=>{
      console.log(res.data) 
      setNowResMem(res.data)
    })
    .catch((error)=>{console.log(error)})
  },[])

  return (
    <div className='chart'>
      <div className='title'>환자 차트</div>

      <div className='mainChart'>
        <div className='chartLeft'>

          <div className='todayReg'>
            <div className='todayTop'>
              <div>당일 예약 환자</div>
              <button>추가</button>
            </div>

            {
              resMemList.map((resMem, i) => {
                const member = resMem.resMemList[0]?.memberList[0];
                return (
                  <div className='todayRegContent' key={i}>
                    <div className='divF'>
                      <div>이름 : {member ? member.memName : null}</div>
                      <div>생년월일 : {member ? member.memBirth : null}</div>
                      <div>성별: {member ? member.memGen : null}</div>
                    </div>
                    <div className='divFSec'>
                      <div>연락처 : {member ? member.memTel : null}</div>
                      <div>
                        <span>수정</span>
                        <span>삭제</span>
                        <button>진료환자 등록</button>
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
          <p>진료 환자</p>
          <div className='trContent'>

            {
              nowResMem.map((resMem, i)=>{
                const member = resMem.resMemList[0]?.memberList[0];
                return(
                  <div className='treatContent' key={i}>
                    <div className='divTrF'>
                      <div>예약번호 : {resMem.resMemList[0]? resMem.resMemList[0].resNum: null}</div>
                    </div>
                    <div className='divTrF'>
                      <div>이름 : {member? member.memName:null} </div>
                      <div>생년월일 : {member? member.memBirth:null}</div>
                      <div>성별: {member? member.memGen:null}</div>
                    </div>
                    <div className='divTrT'>
                      <div>진료 부서 : {resMem.resMemList[0]? resMem.resMemList[0].staffList.staffName:null}</div>
                      <div>담당의 : {resMem.resMemList[0]? resMem.resMemList[0].staffList.staffName:null} </div>
                      <button>환자 삭제</button>
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