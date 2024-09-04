package com.green.Team3.rec.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("recService")
public class RecServiceImpl implements RecService{
    @Autowired
    private SqlSessionTemplate sqlSession;

}
