package com.green.Team3.part.controller;

import com.green.Team3.part.service.PartService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/part")
public class PartController {
    @Resource(name = "partService")
    private PartService partService;
}
