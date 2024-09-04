package com.green.Team3.patie.service;

import com.green.Team3.patie.vo.PatieVO;
import com.green.Team3.patie.vo.SearchVO;

import java.util.List;

public interface PatieService {

    //다음에 들어간 환자번호 조회
    int getNextPatieNum();

    /*첫방문 환자등록*/
    void insertPatie(PatieVO patieVO);

    /*환자 검색*/
    List<PatieVO> searchPaties(SearchVO searchVO);

    /*환자 기본 정보*/
    PatieVO patieInfo(int patieNum);


}
