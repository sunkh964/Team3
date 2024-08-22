package com.green.Team3.history.vo;

import lombok.Data;

import java.util.List;

@Data
public class HistoryVO {
    private int hisNum;
    private int memNum;
    private String illName;
    private String illDetail;
    private int staffNum;
    private List<HistoryVO> staffList;
}