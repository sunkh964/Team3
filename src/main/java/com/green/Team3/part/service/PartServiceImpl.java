package com.green.Team3.part.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("partService")
public class PartServiceImpl implements PartService {
    @Autowired
    private SqlSessionTemplate sqlSession;
}
