package com.green.Team3.staff.service;

import com.green.Team3.schedule.vo.ScheduleVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("staffService")
public class StaffServiceImpl implements StaffService {
    @Autowired
    private SqlSessionTemplate sqlSession;

//    직원 전체의 일정 목록 조회
    @Override
    public List<ScheduleVO> getAllList() {
        return sqlSession.selectList("scheduleMapper.getAllList");
    }

//    직원 한 명의 일정 목록 조회
    @Override
    public List<ScheduleVO> getOneList(int staffNum) {
        return sqlSession.selectList("scheduleMapper.getOneList", staffNum);
    }
}
