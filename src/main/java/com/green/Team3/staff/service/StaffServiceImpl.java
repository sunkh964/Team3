package com.green.Team3.staff.service;

import com.green.Team3.part.vo.PartVO;
import com.green.Team3.staff.vo.StaffVO;
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
}
