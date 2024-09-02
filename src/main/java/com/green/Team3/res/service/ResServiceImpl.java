package com.green.Team3.res.service;

import com.green.Team3.res.vo.ResVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("resService")
public class ResServiceImpl implements ResService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void insertChartRes(ResVO resVO) {
        sqlSession.insert("resMapper.insertChartRes", resVO);
    }

    @Override
    public ResVO selectResNum(int memNum) {
        return sqlSession.selectOne("resMapper.selectResNum", memNum);
    }
}
