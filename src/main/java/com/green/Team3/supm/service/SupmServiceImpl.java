package com.green.Team3.supm.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("supmService")
public class SupmServiceImpl implements SupmService{
    @Autowired
    private SqlSessionTemplate sqlSession;


}
