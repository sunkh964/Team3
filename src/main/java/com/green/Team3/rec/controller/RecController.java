package com.green.Team3.rec.controller;

import com.green.Team3.patie.service.PatieService;
import com.green.Team3.rec.service.RecService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rec")
public class RecController {
    @Resource(name = "recService")
    private RecService recService;
}
