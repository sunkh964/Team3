package com.green.Team3.board.service;

import com.green.Team3.board.vo.BoardVO;

import java.util.List;

public interface BoardService {

//    게시글 목록 조회
    List<BoardVO> boardList(BoardVO boardVO);

//    게시글 상세보기
    BoardVO getNoticeDetail(int boardNum);

//    공지사항 등록
    void insertBoard(BoardVO boardVO);
}
