package com.jeju.planner.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "plan")
@Table(name = "tb_tour_plan")
public class PlanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="plan_id")
    private int plan_id;
    @Column(name="user_id")
    private String user_id; // 아이디
    @Column(name="plan_title")
    private String plan_title; // 계획 제목
    @Column(name = "day_num")
    private int day_num;  // ?일차
    @Column(name = "attr_num")
    private int attr_num; // 장소번호
    @Column(name = "plan_order")
    private int plan_order; // 계획순서
}