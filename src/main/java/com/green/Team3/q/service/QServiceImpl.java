package com.green.Team3.q.service;

import com.green.Team3.a.vo.AVO;
import com.green.Team3.q.vo.QVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("qService")
public class QServiceImpl implements QService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    //    문의한 글 목록 조회
    @Override
    public List<QVO> qnaList(int memNum) {
        return sqlSession.selectList("qnaMapper.qnaList", memNum);
    }

//    문의하기 등록
    @Override
    public void insertQ(QVO qvo) {
        sqlSession.insert("qnaMapper.insertQ", qvo);
    }

//    질문 상세보기
    @Override
    public QVO qdetail(int qNum) {
        return sqlSession.selectOne("qnaMapper.qdetail", qNum);
    }

    @Override
    public AVO reply(int qNum) {
        return sqlSession.selectOne("qnaMapper.reply", qNum);
    }
}
