package com.green.Team3.history.service;

import com.green.Team3.history.vo.HistoryVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("historyService")
public class HistoryServiceImpl implements HistoryService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<HistoryVO> selectHis(int memNum) {
        return sqlSession.selectList("chartMapper.selectHis", memNum);
    }
}