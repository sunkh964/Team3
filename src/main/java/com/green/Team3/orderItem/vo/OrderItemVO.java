package com.green.Team3.orderItem.vo;

import com.green.Team3.supplier.vo.ItemTypeVO;
import com.green.Team3.supplier.vo.ItemVO;
import com.green.Team3.supplier.vo.SupVO;
import lombok.Data;

@Data
public class OrderItemVO {
    private long orderNum;
    private String orderDate;
    private String departTime;
    private String arriveTime;
    private int totalPrice;
    private SupVO supVO;
    private ItemTypeVO itemTypeVO;
    private ItemVO itemVO;
    private DeliverVO deliverVO;
    private int cusNum;
    private OrderDetailVO orderDetailVO;
    private int stockItemCnt;
}
