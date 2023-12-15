package com.jeju.planner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanDto {
    String user_id; // 아이디
    String plan_title; // 계획 제목
    int day_num;  // ?일차
    int attr_num; // 장소번호
    
    int plan_order; // 여행순서


}
