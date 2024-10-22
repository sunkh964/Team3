package com.green.Team3.supplier.service;

import com.green.Team3.supplier.vo.ItemVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("supService")
public class SupServiceImpl implements SupService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    /*발주 목록*/
    @Override
    public List<ItemVO> selectOrderingList() {
        return sqlSession.selectList("supMapper.selectOrderingList");
    }
}
