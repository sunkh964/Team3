package com.green.Team3.res.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("resService")
public class ResServiceImpl implements ResService {
    @Autowired
    private SqlSessionTemplate sqlSession;
}
