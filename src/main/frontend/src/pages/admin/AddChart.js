import React, { useEffect, useState } from 'react';
import './AddChart.css';
import axios from 'axios';

const AddChart = () => {
  const [parts, setParts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedPart, setSelectedPart] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [insertChartMem, setInsertChartMem] = useState({
    memName: '',
    memBirth: '',
    memTel: '',
    memGen: '',
    memAddr: ''
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
    if (selectedPart) {
      axios.get(`/staff/selectStaffName/${selectedPart}`)
        .then((res) => {
          setStaffs(res.data);
        })
        .catch((error) => {
          console.error('Error fetching staffs:', error);
        });
    }
  }, [selectedPart]);

  // 진료부서 변경 핸들러
  const handlePartChange = (event) => {
    setSelectedPart(event.target.value);
  };

  // 담당의 변경 핸들러
  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };

  // 입력 값 변경 핸들러
  const changeMemValue = (e) => {
    setInsertChartMem({
      ...insertChartMem,
      [e.target.name]: e.target.value
    });
  };

  // 환자 및 진료 정보 등록
  const insertChartRes = () => {
    if (Object.values(insertChartMem).some(x => x === '') || !selectedPart || !selectedStaff) {
        alert('모든 필드를 채워야 합니다.');
        return;
    }

    // STAFF_NUM과 PART_NUM 유효성 검증
    if (isNaN(selectedStaff) || selectedStaff <= 0 || isNaN(selectedPart) || selectedPart <= 0) {
        alert('올바른 담당의와 진료부서를 선택해주세요.');
        return;
    }

    console.log('Patient Data:', insertChartMem);
    console.log('Selected Part:', selectedPart);
    console.log('Selected Staff:', selectedStaff);

    axios.post('/member/insertChartMem', insertChartMem)
        .then((response) => {
            const member = response.data;
            console.log('Member response:', member);
            
            if (member && member.memNum) {
                const chartData = {
                    memNum: member.memNum,
                    staffNum: parseInt(selectedStaff, 10), // 숫자로 변환
                    partNum: parseInt(selectedPart, 10)   // 숫자로 변환
                };

                console.log('Reservation Data:', chartData);

                axios.post('/res/insertChartRes', chartData)
                    .then(() => {
                        alert('환자와 진료 정보가 성공적으로 등록되었습니다.');
                    })
                    .catch((error) => {
                        console.error('Error inserting chart res:', error.response ? error.response.data : error.message);
                        alert('진료 정보 등록에 실패하였습니다.');
                    });
            } else {
                throw new Error('memNum이 반환되지 않았습니다.');
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
            <select name='partName' value={selectedPart} onChange={handlePartChange}>
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
            <select name='staffName' value={selectedStaff} onChange={handleStaffChange}>
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
