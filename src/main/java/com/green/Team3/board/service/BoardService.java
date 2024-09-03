package com.green.Team3.board.service;

import com.green.Team3.board.vo.BoardVO;

import java.util.List;

public interface BoardService {

//    게시글 목록 조회
    List<BoardVO> boardList(BoardVO boardVO);
}
