package com.green.Team3.q.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("qService")
public class QServiceImpl implements QService{
    @Autowired
    private SqlSessionTemplate sqlSession;
}
