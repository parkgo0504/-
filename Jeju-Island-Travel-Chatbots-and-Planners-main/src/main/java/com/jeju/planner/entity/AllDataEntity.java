package com.jeju.planner.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "tb_allattr_test")
@AllArgsConstructor
@NoArgsConstructor
public class AllDataEntity {


    // 필드 정의
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int attr_num;

    @Column(name = "name")
    private String name;
    @Column(name = "addr")
    private String addr;
    @Column(name = "lat")
    private String lat;
    @Column(name = "lng")
    private String lng;
    @Column(name = "img")
    private String img;
    @Column(name = "alltag")
    private String alltag;
    @Column(name = "tourtype")
    private String tourtype;
    @Column(name = "raddr")
    private String raddr;
    @Column(name = "tag")
    private String tag;
    @Column(name = "intro")
    private String intro;
    @Column(name = "tel")
    private String tel;
    @Column(name = "city")
    private String city;
    @Column(name = "smallcity")
    private String smallcity;
}