package com.green.Team3.patie.service;

import com.green.Team3.patie.vo.PatieVO;
import com.green.Team3.patie.vo.SearchVO;
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
    public List<PatieVO> searchPaties(SearchVO searchVO) {
        return sqlSession.selectList("patieMapper.searchPaties", searchVO);
    }

    @Override
    public PatieVO patieInfo(int patieNum) {
        return sqlSession.selectOne("patieMapper.patieInfo", patieNum);
    }
}
