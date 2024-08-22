package com.green.Team3.board.controller;

import com.green.Team3.board.service.BoardService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board")
public class BoardController {
    @Resource(name = "boardService")
    private BoardService boardService;
}
