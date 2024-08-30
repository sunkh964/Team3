package com.green.Team3.history.controller;

import com.green.Team3.history.service.HistoryService;
import com.green.Team3.history.vo.HistoryVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history")
public class HistoryController {
    @Resource(name = "historyService")
    private HistoryService historyService;

    @GetMapping("/selectHis/{memNum}")
    public List<HistoryVO> selectHis(@PathVariable("memNum") int memNum){
        return historyService.selectHis(memNum);
    }

    /*차트에 병명등록하기*/
    @PostMapping("/insertHis")
    public void insertHis(@RequestBody HistoryVO historyVO){
        historyService.insertHis(historyVO);
    }
}