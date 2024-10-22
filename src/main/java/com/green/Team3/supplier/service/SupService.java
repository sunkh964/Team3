package com.green.Team3.supplier.service;

import com.green.Team3.supplier.vo.ItemVO;

import java.util.List;

public interface SupService {
    /* 발주 리스트 */
    List<ItemVO> selectOrderingList();

}
