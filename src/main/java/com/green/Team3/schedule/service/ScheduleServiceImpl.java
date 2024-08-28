package com.green.Team3.schedule.service;

import com.green.Team3.schedule.vo.EventVO;
import com.green.Team3.schedule.vo.ScheduleVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<ScheduleVO> getAllList() {
        return sqlSession.selectList("scheduleMapper.getAllList");
    }

    @Override
    public void addEvent(ScheduleVO scheduleVO) {
        sqlSession.insert("scheduleMapper.addEvent", scheduleVO);
    }

    @Override
    public ScheduleVO getDetail(int schNum) {
        return sqlSession.selectOne("scheduleMapper.getDetail", schNum);
    }
}
