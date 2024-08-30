package com.green.Team3.staff.service;

import com.green.Team3.part.vo.PartVO;
import com.green.Team3.staff.vo.StaffVO;
import com.green.Team3.schedule.vo.ScheduleVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("staffService")
public class StaffServiceImpl implements StaffService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    // 부서 목록 조회
    @Override
    public List<PartVO> getPartList() {
        return sqlSession.selectList("staffMapper.getPartList");
    }

    @Override
    public void regStaff(StaffVO staffVO) {
        sqlSession.insert("staffMapper.regStaff", staffVO);
    }

    @Override
    public List<StaffVO> getStaffList(StaffVO staffVO) {
        return sqlSession.selectList("staffMapper.getStaffList", staffVO);
    }

//    직원 전체의 일정 목록 조회
        @Override
        public List<ScheduleVO> getAllList () {
            return sqlSession.selectList("scheduleMapper.getAllList");
        }

//    직원 한 명의 일정 목록 조회
        @Override
        public List<ScheduleVO> getOneList ( int staffNum){
            return sqlSession.selectList("scheduleMapper.getOneList", staffNum);
        }

    // 직원 상세보기
    @Override
    public StaffVO getStaffDetail(int staffNum) {
        return sqlSession.selectOne("staffMapper.getStaffDetail", staffNum);
    }

    @Override
    public StaffVO login(StaffVO staffVO) {
        return sqlSession.selectOne("staffMapper.loginStaff", staffVO);
    }

}