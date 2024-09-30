package com.green.Team3.cus.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("cusService")
public class CusServiceImpl implements CusService {
    @Autowired
    private SqlSessionTemplate sqlSession;


}
