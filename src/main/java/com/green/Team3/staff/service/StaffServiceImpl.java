package com.green.Team3.staff.service;

import com.green.Team3.part.vo.PartVO;
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
}
