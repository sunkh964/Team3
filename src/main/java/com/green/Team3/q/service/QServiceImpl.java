package com.green.Team3.q.service;

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
}
