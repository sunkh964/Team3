package com.green.Team3.orderItem.service;

import com.green.Team3.orderItem.vo.OrderAmountVO;
import com.green.Team3.orderItem.vo.OrderItemVO;
import com.green.Team3.patie.vo.SearchVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderItemService {
    // 당월 주문 목록 리스트
    List<OrderItemVO> selectOrderItem(SearchVO searchVO);

    /*당월 총 주문 금액*/
    List<OrderAmountVO> totalOrderAmount(int currentYear, int currentMonth);

    /*주문 취소된 상품 금액*/
    List<OrderAmountVO> selectCancelOrderAmount(int currentYear, int currentMonth);

    /*수령확인 버튼*/
    void completedDeli(OrderItemVO orderItemVO);

    /*주문취소 버튼*/
    void cancelDeli(OrderItemVO orderItemVO);

    /*재고 관리*/
    List<OrderItemVO> selectStockItem(SearchVO searchVO);


}
