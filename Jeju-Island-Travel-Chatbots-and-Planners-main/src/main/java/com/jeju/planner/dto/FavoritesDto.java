package com.jeju.planner.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoritesDto {

    private int fav_num;
    private String user_id;
    private int attr_num;
}