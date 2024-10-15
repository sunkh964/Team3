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

    /*당월 취소된 총 주문 금액*/
    @GetMapping("/selectCancelOrderAmount")
    public List<OrderAmountVO> selectCancelOrderAmount(
            @RequestParam(value = "currentYear") int currentYear,
            @RequestParam(value = "currentMonth") int currentMonth) {
        return orderItemService.selectCancelOrderAmount(currentYear, currentMonth);
    }

    /*수령확인 버튼*/
    @PutMapping("/completedDeli")
    public void completedDeli(@RequestBody OrderItemVO orderItemVO){
        orderItemService.completedDeli(orderItemVO);
    }

    /*주문 취소 버튼*/
    @PutMapping("/cancelDeli")
    public void cancelDeli(@RequestBody OrderItemVO orderItemVO){
        orderItemService.cancelDeli(orderItemVO);
    }

    /*재고 관리*/
    @PostMapping("/selectStockItem")
    public List<OrderItemVO> selectStockItem(@RequestBody(required = false) SearchVO searchVO){
        return orderItemService.selectStockItem(searchVO);
    }

}
