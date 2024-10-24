package com.green.Team3.orderItem.controller;

import com.green.Team3.orderItem.service.OrderItemService;
import com.green.Team3.orderItem.vo.OrderAmountVO;
import com.green.Team3.orderItem.vo.OrderDetailVO;
import com.green.Team3.orderItem.vo.OrderItemVO;
import com.green.Team3.orderItem.vo.StockCountVO;
import com.green.Team3.patie.vo.SearchVO;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    /*본원 재고량*/
    @GetMapping("/onlyStockCnt")
    public ResponseEntity<Integer> onlyStockCnt(
            @RequestParam(value = "supNum") int supNum,
            @RequestParam(value = "itemNum") int itemNum) {
        int stockCount = orderItemService.onlyStockCnt(supNum, itemNum);
        return ResponseEntity.ok(stockCount);
    }



    /*주문하기*/
    @PostMapping("/goOrder")
    public ResponseEntity<Map<String, Object>> goOrder(@RequestBody OrderItemVO orderItemVO){
        Long orderNum = orderItemService.goOrder(orderItemVO);
        Map<String, Object> response = new HashMap<>();
        response.put("orderNum", orderNum);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/goOrderDetail")
    public void goOrderDetail(@RequestBody OrderDetailVO orderDetailVO){
        orderItemService.goOrderDetail(orderDetailVO);
    }


}
