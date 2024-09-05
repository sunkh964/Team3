import React, { useEffect, useState } from 'react';
import './ReviseChart.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ReviseChart = () => {
  const navigate = useNavigate();
  const { patieNum, recNum } = useParams();
  const [reviseInfo, setReviseInfo] = useState({});
  const [parts, setParts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [updateChart, setUpdateChart] = useState({
    partNum: 0,
    recNum:recNum,
    patieNum:patieNum,
    staffNum: 0,
    recDetail: '',
    recStatus: ''
  });

  // 값 변경 함수
  const changeValue = (e) => {
    setUpdateChart({
      ...updateChart,
      [e.target.name]: e.target.value
    });
  };

  // 정보 받아오기
  useEffect(() => {
    axios.get(`/rec/selectRevise/${patieNum}/${recNum}`)
      .then((res) => {
        console.log(res.data);
        setReviseInfo(res.data);
        setUpdateChart({
          ...updateChart,
          partNum: res.data.partNum || 0,
          staffNum: res.data.staffNum || 0,
          recDetail: res.data.recDetail || '',
          recStatus: res.data.recStatus || ''
        });
      })
      .catch((error) => { console.log(error) });
  }, [patieNum, recNum]);

  // 진료 부서 조회
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
      setStaffs([]);
    }
  }, [updateChart.partNum]);

  // 기본정보 값
  const patie = reviseInfo.patieVO;

  // 버튼 클릭 시 업데이트
  const handleSubmit = () => {
    axios.put(`/rec/updateRevise`, updateChart)
      .then((res) => {
        console.log(res.data);
        navigate('/admin/chart');
      })
      .catch((error) => { console.log(error) });
  };

  return (
    <div className='reviseChart'>
      <div className='reviseChartTitle'>차트 수정</div>
      <table>
        <thead>
          <tr>
            <td colSpan={2}>진료 번호 {reviseInfo.recNum} 번 차트 </td>
          </tr>
          <tr>
            <td><span>이름</span> : <p>{patie?patie.patieName:null}</p> </td>
            <td><span>생년월일</span> : <p>{patie? patie.patieBirth:null}</p></td>
          </tr>
          <tr>
            <td><span>성별</span> : <p>{patie?patie.patieGen:null}</p> </td>
            <td><span>연락처</span> : <p>{patie? patie.patieTel:null}</p></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>예약 여부</span> : <p>{reviseInfo.isRec}</p></td>
            <td><span>접수 시간</span> : <p>{reviseInfo.recDate}</p></td>
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
            <td><span>세부사항</span> : <input type='text' name='recDetail' value={updateChart.recDetail} onChange={changeValue} /></td>
            <td><span>진료 상태</span> : 
              <input type='radio' name='recStatus' value='대기' checked={updateChart.recStatus === '대기'} onChange={changeValue}/> 대기 
              <input type='radio' name='recStatus' value='진료' checked={updateChart.recStatus === '진료'} onChange={changeValue}/> 진료 
              <input type='radio' name='recStatus' value='끝' checked={updateChart.recStatus === '끝'} onChange={changeValue}/> 진료 완료 
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit}>수정</button>
    </div>
  );
};

export default ReviseChart;
