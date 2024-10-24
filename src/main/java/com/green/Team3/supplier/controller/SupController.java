package com.green.Team3.supplier.controller;

import com.green.Team3.supplier.service.SupService;
import com.green.Team3.supplier.vo.ItemVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sup")
public class SupController {
    @Resource(name = "supService")
    private SupService supService;

    /*발주 목록*/
    @GetMapping("/selectOrderingList")
    public List<ItemVO> selectOrderingList(){
        return supService.selectOrderingList();
    }
}
