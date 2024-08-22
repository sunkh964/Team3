package com.green.Team3.staff.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("staffService")
public class StaffServiceImpl implements StaffService {
    @Autowired
    private SqlSessionTemplate sqlSession;
}
