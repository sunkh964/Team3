package com.green.Team3.orderItem.service;

import com.green.Team3.orderItem.vo.OrderItemVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderItemService")
public class OrderItemServiceImpl  implements OrderItemService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<OrderItemVO> selectOrderItem() {
        return sqlSession.selectList("orderItemMapper.selectOrderItem");
    }
}
