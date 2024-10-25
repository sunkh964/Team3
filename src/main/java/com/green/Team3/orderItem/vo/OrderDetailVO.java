package com.green.Team3.orderItem.vo;

import com.green.Team3.supplier.vo.ItemVO;
import lombok.Data;

@Data
public class OrderDetailVO {
    private int detailNum;
    private int orderCnt;
    private int itemNum;
    private int detailPrice;
    private int orderNum;
    private String departTime;
    private String arriveTime;
    private ItemVO itemVO;
    private DeliverVO deliverVO;
}
