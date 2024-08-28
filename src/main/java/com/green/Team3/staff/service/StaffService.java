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

    // 직원 현황 (직원 대표정보 조회)
    List<StaffVO> getStaffList(StaffVO staffVO);

    //    직원 전체의 일정 목록 조회
    List<ScheduleVO> getAllList();
//    직원 한 명의 일정 목록 조회
    List<ScheduleVO> getOneList(int staffNum);

    // 직원 상세정보 목록 조회
    List<StaffVO> getStaffInfoList(StaffVO staffVO);

    // 직원 상세보기
    StaffVO getStaffDetail(int staffNum);

    /*담당의 조회*/
    List<StaffVO> selectStaffName(int partNum);
}


