package com.green.Team3.board.controller;

import com.green.Team3.board.service.BoardService;
import com.green.Team3.board.vo.BoardVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {
    @Resource(name = "boardService")
    private BoardService boardService;

//    게시글 목록 조회
    @GetMapping("/list")
    public List<BoardVO> boardList(BoardVO boardVO){
        return boardService.boardList(boardVO);
    }

    //        게시글 상세조회
    @GetMapping("/NoticeDetail/{boardNum}")
    public BoardVO getNoticeDetail(@PathVariable("boardNum")int boardNum){
        return boardService.getNoticeDetail(boardNum);
    }

//    공지사항 등록
    @PostMapping("/content")
    public void insertBoard(@RequestBody BoardVO boardVO){
        boardService.insertBoard(boardVO);
    }
}
