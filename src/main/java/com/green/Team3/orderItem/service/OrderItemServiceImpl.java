package com.green.Team3.orderItem.service;

import com.green.Team3.orderItem.vo.OrderAmountVO;
import com.green.Team3.orderItem.vo.OrderDetailVO;
import com.green.Team3.orderItem.vo.OrderItemVO;
import com.green.Team3.orderItem.vo.StockCountVO;
import com.green.Team3.patie.vo.SearchVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("orderItemService")
public class OrderItemServiceImpl implements OrderItemService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    /*당월 주문 목록*/
    @Override
    public List<OrderItemVO> selectOrderItem(SearchVO searchVO) {
        return sqlSession.selectList("orderItemMapper.selectOrderItem", searchVO);
    }

    /*당월 총 주문 금액*/
    @Override
    public List<OrderAmountVO> totalOrderAmount(int currentYear, int currentMonth) {
        return sqlSession.selectList("orderItemMapper.totalOrderAmount",
                Map.of("currentYear", currentYear, "currentMonth", currentMonth));
    }

    /*주문 취소된 상품 금액*/
    @Override
    public List<OrderAmountVO> selectCancelOrderAmount(int currentYear, int currentMonth) {
        return sqlSession.selectList("orderItemMapper.selectCancelOrderAmount",
                Map.of("currentYear", currentYear, "currentMonth", currentMonth));
    }

    /*수령확인 버튼*/
    @Override
    public void completedDeli(OrderItemVO orderItemVO) {
        sqlSession.update("orderItemMapper.completedDeli", orderItemVO);
    }

    /*주문 취소 버튼*/
    @Override
    public void cancelDeli(OrderItemVO orderItemVO) {
        sqlSession.update("orderItemMapper.cancelDeli", orderItemVO);
    }

    /*재고 관리*/
    @Override
    public List<OrderItemVO> selectStockItem(SearchVO searchVO) {
        return sqlSession.selectList("orderItemMapper.selectStockItem", searchVO);
    }

    /*본원 재고량*/
    @Override
    public int onlyStockCnt(int supNum, int itemNum) {
        return sqlSession.selectOne("orderItemMapper.onlyStockCnt", Map.of("supNum", supNum, "itemNum", itemNum));
    }

    /*주문하기*/
    @Override
    public Long goOrder(OrderItemVO orderItemVO) {
        sqlSession.insert("orderItemMapper.goOrder", orderItemVO);
        return orderItemVO.getOrderNum();
    }

    @Override
    public void goOrderDetail(OrderDetailVO orderDetailVO) {
        sqlSession.insert("orderItemMapper.goOrderDetail", orderDetailVO);
    }
}
