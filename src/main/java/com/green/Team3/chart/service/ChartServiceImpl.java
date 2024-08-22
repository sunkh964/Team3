package com.green.Team3.chart.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("chartService")
public class ChartServiceImpl implements ChartService {
    @Autowired
    private SqlSessionTemplate sqlSession;
}
