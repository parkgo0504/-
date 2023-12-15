package com.jeju.planner.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="marker")
@Table(name = "tb_allattr_test")
public class MarkerEntity {

    @Id
    private int attr_num;

    private String name;
    private String tourtype;
    private String lat;
    private String lng;
    private String addr;
    private String raddr;
    private String img;
    private String tel;
    private String intro;
}
