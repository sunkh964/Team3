package com.green.Team3.orderItem.service;

import com.green.Team3.orderItem.vo.OrderAmountVO;
import com.green.Team3.orderItem.vo.OrderItemVO;
import com.green.Team3.patie.vo.SearchVO;

import java.util.List;

public interface OrderItemService {
    // 당월 주문 목록 리스트
    List<OrderItemVO> selectOrderItem(SearchVO searchVO);

    /*당월 총 주문 금액*/
    List<OrderAmountVO> totalOrderAmount();

    // 저번달 주문 목록 리스트
    List<OrderItemVO> selectLastMonth(SearchVO searchVO);
}
