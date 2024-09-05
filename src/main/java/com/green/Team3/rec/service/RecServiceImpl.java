package com.green.Team3.rec.service;

import com.green.Team3.rec.vo.RecVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service("recService")
public class RecServiceImpl implements RecService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public void insertRec(@RequestBody RecVO recVO) {
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

    @Override
    public List<RecVO> selectHis(int patieNum) {
        return sqlSession.selectList("recMapper.selectHis", patieNum);
    }

    @Override
    public RecVO selectRevise(RecVO recVO) {
        return sqlSession.selectOne("recMapper.selectRevise", recVO);
    }

    @Override
    public void updateRevise(RecVO recVO) {

        sqlSession.update("recMapper.updateRevise", recVO);
    }

    @Override
    public void delRec(int recNum) {
        sqlSession.delete("recMapper.delRec", recNum);
    }
}

