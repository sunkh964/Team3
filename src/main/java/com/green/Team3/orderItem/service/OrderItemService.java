package com.green.Team3.orderItem.service;

import com.green.Team3.orderItem.vo.OrderItemVO;
import com.green.Team3.patie.vo.SearchVO;

import java.util.List;

public interface OrderItemService {
    List<OrderItemVO> selectOrderItem(SearchVO searchVO);
}
