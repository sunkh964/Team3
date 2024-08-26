package com.green.Team3.staff.service;

import com.green.Team3.schedule.vo.ScheduleVO;

import java.util.List;

public interface StaffService {
//    직원 전체의 일정 목록 조회
    List<ScheduleVO> getAllList();
//    직원 한 명의 일정 목록 조회
    List<ScheduleVO> getOneList(int staffNum);
}
