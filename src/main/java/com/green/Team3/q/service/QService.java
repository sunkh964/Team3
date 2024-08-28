package com.green.Team3.q.service;

import com.green.Team3.q.vo.QVO;

import java.util.List;

public interface QService {

//    문의한 글 목록 조회
    List<QVO> qnaList(int memNum);
}
