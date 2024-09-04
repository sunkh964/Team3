package com.green.Team3.schedule.service;

import com.green.Team3.rec.vo.RecVO;
import com.green.Team3.schedule.vo.DoctorScheduleVO;
import com.green.Team3.schedule.vo.ScheduleVO;

import java.util.List;

public interface ScheduleService {
//    직원 전체의 일정 목록 조회
    List<ScheduleVO> getAllList();
//    로그인한 직원의 일정 목록 조회
    List<ScheduleVO> getOneList(int staffNum);
//    새 이벤트 등록하기
    void addEvent(ScheduleVO scheduleVO);
//    일정 상세 조회
    ScheduleVO getDetail(int schNum);
//    일정 상세 삭제
    void deleteEvent(int schNum);
//    일정 수정
    void modifyEvent(ScheduleVO scheduleVO);
//    진료 + 개인 일정 조회
    List<DoctorScheduleVO> getAllSchedule(int staffNum);
//    진료 일정 상세 조회
    RecVO getRecDetail(int recNum);
}
