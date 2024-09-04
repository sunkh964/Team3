package com.green.Team3.rec.service;

import com.green.Team3.rec.vo.RecVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("recService")
public class RecServiceImpl implements RecService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void insertRec(RecVO recVO) {
        sqlSession.insert("recMapper.insertRec", recVO);
    }

    @Override
    public List<RecVO> selectWaitPatie() {
        return sqlSession.selectList("recMapper.selectWaitPatie");
    }

    @Override
    public List<RecVO> selectIngPatie() {
        return sqlSession.selectList("recMapper.selectIngPatie");
    }

    @Override
    public void updateStatus(RecVO recVO) {
        sqlSession.update("recMapper.updateStatus", recVO);
    }

    @Override
    public void endStatus(RecVO recVO) {
        sqlSession.update("recMapper.endStatus", recVO);
    }
}
