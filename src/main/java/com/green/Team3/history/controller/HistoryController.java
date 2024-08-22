package com.green.Team3.history.controller;

import com.green.Team3.history.service.HistoryService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/history")
public class HistoryController {
    @Resource(name = "historyService")
    private HistoryService historyService;

}