package com.jeju.planner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarkerDto {

    private String name;
    private String tourtype;
    private String lat;
    private String lng;
    private String addr;
    private String raddr;
    private String images;


}
