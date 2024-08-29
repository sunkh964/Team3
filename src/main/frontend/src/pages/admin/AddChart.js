import React, { useEffect, useState } from 'react';
import './AddChart.css';
import axios from 'axios';

const AddChart = () => {
  const [parts, setParts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  
  const [insertChartMem, setInsertChartMem] = useState({
    memNum: 0,
    memName: '',
    memBirth: '',
    memTel: '',
    memGen: '',
    memAddr: '',
    staffNum: '',
    partNum: ''
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
    if (insertChartMem.partNum) {
      axios.get(`/staff/selectStaffName/${insertChartMem.partNum}`)
        .then((res) => {
          setStaffs(res.data);
        })
        .catch((error) => {
          console.error('Error fetching staffs:', error);
        });
    } else {
      setStaffs([]); // `partNum`이 없는 경우 직원 목록 초기화
    }
  }, [insertChartMem.partNum]);

  // 입력 값 변경 핸들러
  const changeMemValue = (e) => {
    setInsertChartMem({
      ...insertChartMem,
      [e.target.name]: e.target.value
    });
  };

  // 환자 및 진료 정보 등록
  const insertChartRes = () => {
    if (!insertChartMem.partNum || !insertChartMem.staffNum) {
      alert('진료부서와 담당의를 선택해야 합니다.');
      return;
    }
    if (Object.values(insertChartMem).some(x => x === '')) {
      alert('모든 필드를 채워야 합니다.');
      return;
    }

    axios.post('/member/insertChartMem', insertChartMem)
      .then((response) => {
        const member = response.data;
        console.log(insertChartMem)
        console.log('Member response:', member);

        if (member && member.memNum) {
          const updatedChartMem = {
            ...insertChartMem,
            memNum: member.memNum
          };

          axios.post('/res/insertChartRes', updatedChartMem)
            .then(() => {
              alert('환자와 진료 정보가 성공적으로 등록되었습니다.');
            })
            .catch((error) => {
              console.error('Error inserting chart res:', error.response ? error.response.data : error.message);
              alert('진료 정보 등록에 실패하였습니다.');
            });
        }
      })
      .catch((error) => {
        console.error('Error inserting chart mem:', error.response ? error.response.data : error.message);
        alert('환자 정보 등록에 실패하였습니다.');
      });
  };

  return (
    <div className='addChartBack'>
      <div className='addChart'>
        <div className='addTitle'>환자 기본 정보</div>
        <div className='addContent'>
          <div className='cM'>
            <span>이름 : </span>
            <input type='text' name='memName' value={insertChartMem.memName} onChange={changeMemValue} />
          </div>
          <div>
            <span>주민등록번호 :</span>
            <input type='text' name='memBirth' value={insertChartMem.memBirth} onChange={changeMemValue} />
          </div>
        </div>
        <div className='addContent'>
          <div>
            <span>연락처 :</span>
            <input type='text' name='memTel' value={insertChartMem.memTel} onChange={changeMemValue} />
          </div>
          <div className='cM'>
            <span>성별 :</span>
            <input type='text' name='memGen' value={insertChartMem.memGen} onChange={changeMemValue} />
          </div>
        </div>
        <div className='addContent'>
          <div className='address'>
            <span>주소 :</span>
            <input type='text' name='memAddr' value={insertChartMem.memAddr} onChange={changeMemValue} />
          </div>
        </div>

        <div className='addTitle title2'>진료 정보</div>
        <div className='addContent'>
          <div>
            <span>진료부서 :</span>
            <select name='partNum' value={insertChartMem.partNum} onChange={changeMemValue}>
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
            <select name='staffNum' value={insertChartMem.staffNum} onChange={changeMemValue}>
              <option value="">담당의 선택</option>
              {staffs.map((staff, i) => (
                <option key={i} value={staff.staffNum}>
                  {staff.staffName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className='addChartBtn' onClick={insertChartRes}>환자 등록</button>
      </div>
    </div>
  );
};

export default AddChart;
