package com.green.Team3.board.service;

import com.green.Team3.board.vo.BoardVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
    @Autowired
    private SqlSessionTemplate sqlSession;

//    게시글 목록 조회
    @Override
    public List<BoardVO> boardList(BoardVO boardVO) {
        return sqlSession.selectList("boardMapper.boardList", boardVO);
    }

//    게시글 상세조회
    @Override
    public BoardVO getNoticeDetail(int boardNum) {
        return sqlSession.selectOne("boardMapper.getNoticeDetail", boardNum);
    }

    @Override
    public void insertBoard(BoardVO boardVO) {
        sqlSession.insert("boardMapper.insertBoard", boardVO);
    }
}
