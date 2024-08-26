package com.green.Team3.staff.service;

import com.green.Team3.part.vo.PartVO;
import com.green.Team3.staff.vo.StaffVO;
import com.green.Team3.schedule.vo.ScheduleVO;

import java.util.List;

public interface StaffService {

    // 부서 목록 조회
    List<PartVO> getPartList();

    // 직원 등록
    void regStaff(StaffVO staffVO);

    // 직원 조회
    List<StaffVO> getStaffList(StaffVO staffVO);
//    직원 전체의 일정 목록 조회
    List<ScheduleVO> getAllList();
//    직원 한 명의 일정 목록 조회
    List<ScheduleVO> getOneList(int staffNum);
}
