import React, { useEffect, useState } from 'react';
import './AddChart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddChart = () => {
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  
  const [insertChart, setinsertChart] = useState({
    memNum: 0,
    memName: '',
    memBirth: '',
    memTel: '',
    memGen: '',
    memAddr: '',
    staffNum: 0,
    resNum: 0,
    partNum: 0,
    isNow:'',
    illName:'',
    illDetail:''
  });

  // 진료부서 조회
  useEffect(() => {
    axios.get('/staff/getPart')
      .then((res) => {
        setParts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching parts:', error);
      });
  }, []);

  // 담당의 조회
  useEffect(() => {
    if (insertChart.partNum) {
      axios.get(`/staff/selectStaffName/${insertChart.partNum}`)
        .then((res) => {
          setStaffs(res.data);
        })
        .catch((error) => {
          console.error('Error fetching staffs:', error);
        });
    } else {
      setStaffs([]); // `partNum`이 없는 경우 직원 목록 초기화
    }
  }, [insertChart.partNum]);

  // 입력 값 변경 핸들러
  const changeValue = (e) => {
    setinsertChart({
      ...insertChart,
      [e.target.name]: e.target.value
    });
  };

  // 환자 및 진료 정보 등록
  const insertChartRes = async () => {
    try {
      // 1. 멤버 추가
      const memberResponse = await axios.post('/member/insertChartMem', insertChart);
      const member = memberResponse.data;
      if (!member || !member.memNum) {
        throw new Error('Member creation failed');
      }
  
      // 2. 진료 기록 추가
      const resResponse = await axios.post('/res/insertChartRes', {
        ...insertChart,
        memNum: member.memNum
      });
      const res = resResponse.data;
      if (!res || !res.resNum) {
        throw new Error('Chart record creation failed');
      }
  
      // 3. 차트 추가
      const chartResponse = await axios.post('/chart/insertChart', {
        ...insertChart,
        resNum: res.resNum
      });
      const chart = chartResponse.data;
      if (!chart || !chart.chartNum) {
        throw new Error('Chart creation failed');
      }
  
      // 4. 병병 추가
      const historyResponse = await axios.post('/history/insertHis', {
        ...insertChart,
        resNum: res.resNum,
        chartNum: chart.chartNum
      });
      console.log('History insert response:', historyResponse.data);
  
      alert('등록되었습니다.');
      navigate('/admin/chart');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  
  
  

  return (
    <div className='addChartBack'>
      <div className='addChart'>
        <div className='addTitle'>환자 기본 정보</div>
        <div className='addContent'>
          <div className='cM'>
            <span>이름 : </span>
            <input type='text' name='memName' value={insertChart.memName} onChange={changeValue} />
          </div>
          <div>
            <span>주민등록번호 :</span>
            <input type='text' name='memBirth' value={insertChart.memBirth} onChange={changeValue} />
          </div>
        </div>
        <div className='addContent'>
          <div>
            <span>연락처 :</span>
            <input type='text' name='memTel' value={insertChart.memTel} onChange={changeValue} />
          </div>
          <div className='cM'>
            <span>성별 :</span>
            <input type='text' name='memGen' value={insertChart.memGen} onChange={changeValue} />
          </div>
        </div>
        <div className='addContent'>
          <div className='address'>
            <span>주소 :</span>
            <input type='text' name='memAddr' value={insertChart.memAddr} onChange={changeValue} />
          </div>
        </div>

        <div className='addTitle title2'>진료 정보</div>
        <div className='addContent'>
          <div>
            <span>진료부서 :</span>
            <select name='partNum' value={insertChart.partNum} onChange={changeValue}>
              <option value="">진료부서 선택</option>
              {parts.map((part, i) => (
                <option key={i} value={part.partNum}>
                  {part.partName}
                </option>
              ))}
            </select>
          </div>
          <div className='cM'>
            <span>담당의 :</span>
            <select name='staffNum' value={insertChart.staffNum} onChange={changeValue}>
              <option value="">담당의 선택</option>
              {staffs.map((staff, i) => (
                <option key={i} value={staff.staffNum}>
                  {staff.staffName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='addTitle'>환자 차트</div>
        <div className='addContent'>
          <div className='cM'>
            <span>당일 진료 : </span>
            <input type='text' name='isNow' value={insertChart.isNow} onChange={changeValue} />
          </div>
          <div>
            <span>병명 :</span>
            <input type='text' name='illName' value={insertChart.illName} onChange={changeValue} />
          </div>
        </div>
        <div className='addContent'>
          <div className='address'>
            <span> 세부사항 :</span>
            <input type='text' name='illDetail' value={insertChart.illDetail} onChange={changeValue} />
          </div>
        </div>

        <button className='addChartBtn' onClick={insertChartRes}>환자 등록</button>
      </div>
    </div>
  );
};

export default AddChart;