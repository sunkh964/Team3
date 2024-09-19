import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ReservSelect = () => {
  const navigate = useNavigate();

  // 회원의 예약 리스트 저장
  const [resList, setResList] = useState([]);

  useEffect((patieNum)=>{
    axios.get(`/rec/selectIdRec/1`)
    .then((res) =>{
      setResList(res.data)
    })
    .catch((error) =>{console.log(error);})
  },[]);

  return (
    <div>
      {
        resList.map((res,i)=>{
          return(
            <div>{res.patieName}</div>
          );
        })
      }
    </div>
  )
}

export default ReservSelect