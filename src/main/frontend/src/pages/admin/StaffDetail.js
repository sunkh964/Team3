import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const StaffDetail = () => {

  const {staffNum} = useParams();

  // 직원 상세 정보를 저장할 변수
  const [staffDetail, setStaffDetail] = useState({});

  // 직원 상세정보 조회
  useEffect(()=>{
    axios.get(`/staff/getStaffDetail/${staffNum}`)
    .then((res) =>{
      setStaffDetail(res.data);
    })
    .catch((error) =>{console.log(error)})
  },[]);

  return (
    <div>
      <div>이름 : {staffDetail.staffName}</div>
    </div>
  )
}

export default StaffDetail