import React, { useEffect, useState } from 'react';
import './ReviseChart.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReviseChart = () => {
  const { memNum } = useParams();
  const [reviseInfo, setReviseInfo] = useState({});
  const [parts, setParts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [updateChart, setUpdateChart] = useState({
    resTime: '',
    isNow: '',
    partNum: 0,
    staffNum: 0,
    illName: '',
    illDetail: ''
  });

  // 값 변경
  function changeValue(e) {
    setUpdateChart({
      ...updateChart,
      [e.target.name]: e.target.value
    });
    console.log(updateChart);
  }

  // 정보 받아오기
  useEffect(() => {
    axios.get(`/chart/reviseInfo/${memNum}`)
      .then((res) => {
        console.log(res.data);
        setReviseInfo(res.data);
        // 초기 값 설정
        if (res.data.resMemList && res.data.resMemList.length > 0) {
          const member = res.data.resMemList[0].memberList[0];
          setUpdateChart(prevState => ({
            ...prevState,
            resTime: res.data.resTime || '',
            isNow: res.data.isNow || '',
            // 초기값 설정 (예시)
            partNum: res.data.partNum || 0,
            staffNum: res.data.staffNum || 0,
            illName: res.data.illName || '',
            illDetail: res.data.illDetail || ''
          }));
        }
      })
      .catch((error) => { console.log(error) });
  }, [memNum]);

  // 진료부서 조회
  useEffect(() => {
    axios.get('/staff/getPart')
      .then((res) => {
        console.log(res.data);
        setParts(res.data);
      })
      .catch((error) => { console.log(error) });
  }, []);

  // 담당의 조회
  useEffect(() => {
    if (updateChart.partNum) {
      axios.get(`/staff/selectStaffName/${updateChart.partNum}`)
        .then((res) => {
          setStaffs(res.data);
        })
        .catch((error) => { console.log(error) });
    } else {
      setStaffs([]); // `partNum`이 없는 경우 직원 목록 초기화
    }
  }, [updateChart.partNum]);

  // 기본정보 값
  const memList = reviseInfo.resMemList && reviseInfo.resMemList.length > 0 ? reviseInfo.resMemList[0].memberList[0] : '';

  const handleSubmit = () => {
    // 차트 업데이트 API 호출
    axios.put('/chart/updateChart', {
      chartNum: reviseInfo.chartNum,
      // resTime: updateChart.resTime,
      isNow: updateChart.isNow
    })
    .then(response => {
      console.log('차트 업데이트 성공');
      
      // 병력 업데이트 API 호출
      axios.put('/chart/updateHistory', {
        chartNum: reviseInfo.chartNum,
        illName: updateChart.illName,
        illDetail: updateChart.illDetail,
        partNum: updateChart.partNum,
        staffNum: updateChart.staffNum
      })
      .then(response => {
        console.log('병력 업데이트 성공');
      })
      .catch(error => {
        console.log('병력 업데이트 실패:', error);
      });
    })
    .catch(error => {
      console.log('차트 업데이트 실패:', error);
    });
  };

  return (
    <div className='reviseChart'>
      <div className='reviseChartTitle'>차트 수정</div>
      <table>
        <thead>
          <tr>
            <td colSpan={2}>차트 번호 : {reviseInfo.chartNum} </td>
          </tr>
          <tr>
            <td><span>이름</span> : {memList.memNum} </td>
            <td><span>생년월일</span> : {memList.memBirth}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>예약 시간</span> : <input type='text' name='resTime' value={updateChart.resTime} onChange={changeValue} /></td>
            <td><span>당일 진료</span> : <input type='text' name='isNow' value={updateChart.isNow} onChange={changeValue} /></td>
          </tr>
          <tr>
            <td><span>진료 부서</span> :
              <select name='partNum' value={updateChart.partNum} onChange={changeValue}>
                <option value=''>진료부서 선택</option>
                {
                  parts.map((part, i) => (
                    <option key={i} value={part.partNum}> {part.partName} </option>
                  ))
                }
              </select>
            </td>
            <td><span>담당의</span> :
              <select name='staffNum' value={updateChart.staffNum} onChange={changeValue}>
                <option value=''>담당의 선택</option>
                {staffs.map((staff, i) => (
                  <option key={i} value={staff.staffNum}> {staff.staffName} </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><span>병명</span> : <input type='text' name='illName' value={updateChart.illName} onChange={changeValue} /></td>
            <td><span>세부사항</span> : <input type='text' name='illDetail' value={updateChart.illDetail} onChange={changeValue} /></td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}

export default ReviseChart;
