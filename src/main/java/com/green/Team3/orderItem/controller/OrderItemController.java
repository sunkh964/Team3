package com.green.Team3.orderItem.controller;

import com.green.Team3.orderItem.service.OrderItemService;
import com.green.Team3.orderItem.vo.OrderAmountVO;
import com.green.Team3.orderItem.vo.OrderItemVO;
import com.green.Team3.patie.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderItem")
public class OrderItemController {
    @Resource(name = "orderItemService")
    private OrderItemService orderItemService;

    /*당월 주문 목록*/
    @PostMapping("/selectOrderItem")
    public List<OrderItemVO> selectOrderItem(@RequestBody(required = false) SearchVO searchVO) {
        return orderItemService.selectOrderItem(searchVO);
    }
    /*당월 총 주문금액*/
    @GetMapping("/totalOrderAmount")
    public List<OrderAmountVO> totalOrderAmount(
            @RequestParam(value = "currentYear") int currentYear,
            @RequestParam(value = "currentMonth") int currentMonth) {
        return orderItemService.totalOrderAmount(currentYear, currentMonth);
    }


    /*저번달 주문 목록*/
    @PostMapping("/selectLastMonth")
    public List<OrderItemVO> selectLastMonth(@RequestBody(required = false) SearchVO searchVO){
        return orderItemService.selectLastMonth(searchVO);
    }

}
