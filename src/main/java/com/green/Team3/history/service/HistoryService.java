package com.green.Team3.history.service;

import com.green.Team3.history.vo.HistoryVO;

import java.util.List;

public interface HistoryService {
    /*진료 이력 리스트*/
    List<HistoryVO> selectHis(int memNum);

    /*차트에 병명등록하기*/
    void insertHis(HistoryVO historyVO);
}
