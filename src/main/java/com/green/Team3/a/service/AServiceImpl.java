package com.green.Team3.a.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("aService")
public class AServiceImpl implements AService {

    @Autowired
    private SqlSessionTemplate sqlSession;
}
