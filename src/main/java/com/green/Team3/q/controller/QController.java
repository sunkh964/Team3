package com.green.Team3.q.controller;

import com.green.Team3.q.service.QService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/q")
public class QController {
    @Resource(name = "qService")
    private QService qService;
}
