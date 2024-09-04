package com.green.Team3.schedule.service;

import com.green.Team3.rec.vo.RecVO;
import com.green.Team3.schedule.vo.DoctorScheduleVO;
import com.green.Team3.schedule.vo.ScheduleVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    private SqlSessionTemplate sqlSession;

//    직원 전체의 일정 목록 조회
    @Override
    public List<ScheduleVO> getAllList() {
        return sqlSession.selectList("scheduleMapper.getAllList");
    }

//    로그인한 직원의 일정 목록 조회
    @Override
    public List<ScheduleVO> getOneList(int staffNum) {
        return sqlSession.selectList("scheduleMapper.getOneList", staffNum);
    }

//    새 이벤트 등록하기
    @Override
    public void addEvent(ScheduleVO scheduleVO) {
        sqlSession.insert("scheduleMapper.addEvent", scheduleVO);
    }

//    일정 상세 조회
    @Override
    public ScheduleVO getDetail(int schNum) {
        return sqlSession.selectOne("scheduleMapper.getDetail", schNum);
    }

//    일정 상세 삭제
    @Override
    public void deleteEvent(int schNum) {
        sqlSession.delete("scheduleMapper.deleteEvent", schNum);
    }

//    일정 수정
    @Override
    public void modifyEvent(ScheduleVO scheduleVO) {
        sqlSession.update("scheduleMapper.modifyEvent", scheduleVO);
    }

//    진료 + 개인 일정 조회
    @Override
    public List<DoctorScheduleVO> getAllSchedule(int staffNum) {
        return sqlSession.selectList("scheduleMapper.getAllSchedule", staffNum);
    }

//    진료 일정 상세 조회
    @Override
    public RecVO getRecDetail(int recNum) {
        return sqlSession.selectOne("scheduleMapper.getRecDetail", recNum);
    }
}