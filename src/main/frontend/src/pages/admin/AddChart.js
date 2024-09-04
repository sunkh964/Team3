import React, { useEffect, useState } from 'react';
import './AddChart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddChart = () => {
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  
  const [insertChart, setinsertChart] = useState({
    patieNum: 0,
    patieName: '',
    patieBirth: '',
    patieTel: '',
    patieGen: '',
    patieAddr: '',
    staffNum: 0,
    partNum: 0,
    recStatus:'',
    recDetail:''
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
      setStaffs([]); 
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
  const insertChartRes = () => {
  // 필수 값이 비어 있는지 확인
  if (!insertChart.patieName || !insertChart.patieTel || !insertChart.patieBirth ||
      !insertChart.patieAddr || !insertChart.patieGen || !insertChart.staffNum || !insertChart.partNum) {
    alert('모든 필드를 입력하세요.');
    return;
  }
  
  axios.post('/patie/insertPatie', insertChart)
    .then((res) => {
      const patieNum = res.data;
      console.log(res.data);
      
      axios.post('/rec/insertRec', {
        ...insertChart,
        patieNum: patieNum
      }).then((res) => {
        console.log(res.data)
        alert('등록되었습니다.')
        navigate('/admin/chart')
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
};


  return (
    <div className='addChartBack'>
      <div className='addChart'>
        <div className='topTitle'>첫방문 환자 진료 정보 추가</div>
        <div className='addTitle'>환자 기본 정보</div>
        <div className='addContent'>
          <div className='cM'>
            <span>이름 : </span>
            <input type='text' name='patieName' value={insertChart.patieName} onChange={changeValue} />
          </div>
          <div>
            <span>주민등록번호 :</span>
            <input type='text' name='patieBirth' value={insertChart.patieBirth} onChange={changeValue} />
          </div>
        </div>
        <div className='addContent'>
          <div>
            <span>연락처 :</span>
            <input type='text' name='patieTel' value={insertChart.patieTel} onChange={changeValue} />
          </div>
          <div className='cM'>
            <span>성별 :</span>
            <input type='text' name='patieGen' value={insertChart.memGen} onChange={changeValue} />
          </div>
        </div>
        <div className='addContent'>
          <div className='address'>
            <span>주소 :</span>
            <input type='text' name='patieAddr' value={insertChart.patieAddr} onChange={changeValue} />
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
        </div>
        <div className='addContent'>
          <div className='address'>
            <span> 증상 :</span>
            <input type='text' name='recDetail' onChange={changeValue} />
          </div>
        </div>

        <button className='addChartBtn' onClick={insertChartRes}>환자 등록</button>
      </div>
    </div>
  );
};

export default AddChart;
