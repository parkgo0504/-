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
@Entity(name="Tour")
@Table(name = "tb_tour")
public class TourEntity {

    //pk
    @Id
    // 기본키를 자동으로 생성해주는 어노테이션
    // strategy = 전략
    // strategy - IDENTITY : AUTO_INCREMENT
    //          - SEQUENCE : 오라클 POSTGRE 시퀀스를 지원
    //          - TABLE : 키 생성 전용 테이블 만들고 이름, 값을 만들어서 시퀀스를 흉내내는 것
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tourNum;
    private String userId;
    private String tourTitle;

    private String createdAt;


}
