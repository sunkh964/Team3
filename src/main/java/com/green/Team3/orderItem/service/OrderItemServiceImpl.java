package com.green.Team3.orderItem.service;

import com.green.Team3.orderItem.vo.OrderAmountVO;
import com.green.Team3.orderItem.vo.OrderItemVO;
import com.green.Team3.patie.vo.SearchVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderItemService")
public class OrderItemServiceImpl  implements OrderItemService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    /*당월 주문 목록*/
    @Override
    public List<OrderItemVO> selectOrderItem(SearchVO searchVO) {
        return sqlSession.selectList("orderItemMapper.selectOrderItem", searchVO);
    }

    /*당월 총 주문 금액*/
    @Override
    public List<OrderAmountVO> totalOrderAmount() {
        return sqlSession.selectList("orderItemMapper.totalOrderAmount");
    }

    @Override
    public List<OrderItemVO> selectLastMonth(SearchVO searchVO) {
        return sqlSession.selectList("orderItemMapper.selectLastMonth");
    }
}
