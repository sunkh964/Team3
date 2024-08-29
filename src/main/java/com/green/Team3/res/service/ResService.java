package com.green.Team3.res.service;

import com.green.Team3.member.vo.MemberVO;
import com.green.Team3.part.vo.PartVO;
import com.green.Team3.res.vo.ResVO;
import com.green.Team3.staff.vo.StaffVO;

import java.lang.reflect.Member;
import java.util.List;

public interface ResService {
    /*당일 예약 환자 등록*/
    void insertChartRes(ResVO resVO);

}
