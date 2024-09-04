package com.green.Team3.patie.service;

import com.green.Team3.patie.vo.PatieVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("patieService")
public class PatieServiceImpl implements PatieService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public int getNextPatieNum() {
        return sqlSession.selectOne("patieMapper.getNextPatieNum");
    }

    @Override
    public void insertPatie(PatieVO patieVO) {
        sqlSession.insert("patieMapper.insertPatie", patieVO);
    }

    @Override
    public List<PatieVO> searchPatie(PatieVO patieVO) {
        return sqlSession.selectList("patieMapper.searchPatie", patieVO);
    }
}
