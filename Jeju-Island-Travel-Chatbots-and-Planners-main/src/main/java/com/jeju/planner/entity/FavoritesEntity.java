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
@Entity(name="Fvrts")
@Table(name = "tb_favorites")
public class FavoritesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fav_num;
    private String user_id;
    private int attr_num;

    // getters and setters
}

