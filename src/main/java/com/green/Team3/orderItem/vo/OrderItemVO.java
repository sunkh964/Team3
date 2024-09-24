package com.green.Team3.orderItem.vo;

import com.green.Team3.supplier.vo.ProductTypeVO;
import com.green.Team3.supplier.vo.SupProductVO;
import com.green.Team3.supplier.vo.SupVO;
import lombok.Data;

@Data
public class OrderItemVO {
    private int orderItemNum;
    private int quantity;
    private String orderDate;
    private SupVO supVO;
    private ProductTypeVO productTypeVO;
    private SupProductVO supProductVO;
    private String deliverState;
}
