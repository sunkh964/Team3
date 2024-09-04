package com.green.Team3.patie.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("patieServcie")
public class PatieServiceImpl implements PatieService {
    @Autowired
    private SqlSessionTemplate sqlSession;
}
