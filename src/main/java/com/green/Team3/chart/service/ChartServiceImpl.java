package com.green.Team3.chart.service;

import com.green.Team3.chart.vo.ChartVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("chartService")
public class ChartServiceImpl implements ChartService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<ChartVO> selectMemChart() {
        return sqlSession.selectList("chartMapper.selectMemChart");
    }

    @Override
    public List<ChartVO> getIsNowMemChart() {
        return sqlSession.selectList("chartMapper.getIsNowMemChart");
    }
}
