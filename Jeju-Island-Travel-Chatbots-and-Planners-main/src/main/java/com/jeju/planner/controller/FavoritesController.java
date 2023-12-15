package com.jeju.planner.controller;


import com.jeju.planner.dto.FavoritesDto;
import com.jeju.planner.entity.FavoritesEntity;
import com.jeju.planner.mapper.FavoriteMapper;
import com.jeju.planner.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FavoritesController {


    private final FavoritesService favoritesService;

    private final FavoriteMapper favoriteMapper;

    @Autowired
    public FavoritesController(FavoritesService favoritesService, FavoriteMapper favoriteMapper) {
        this.favoritesService = favoritesService;
        this.favoriteMapper = favoriteMapper;
    }


    /*@PostMapping("/favorite")
    public List<FavoritesEntity> createFavorites(@RequestBody List<FavoritesDto> favoriteDtoList) {
        List<FavoritesEntity> favoritesEntities = new ArrayList<>();
        for (FavoritesDto favoriteDto : favoriteDtoList) {
            favoritesEntities.add(favoritesService.createFavorites(favoriteDto));
        }
        return favoritesEntities;
    }*/

    /*@DeleteMapping("/favorite/{fav_num}")
    public ResponseEntity<?> deleteFavorites(@PathVariable int fav_num) {
        favoritesService.deleteFavorites(fav_num);
        return ResponseEntity.ok().build();
    }*/

    // 즐겨찾기 보여주기
    @PostMapping("/favorite/select")
    public List<HashMap<String, Object>> selectFavorites(@RequestParam("user_id") String user_id){
        return favoritesService.selectFavorites(user_id);
    }

    // 즐겨찾기 저장
    @PostMapping("/favorite/save")
    public ResponseEntity<String> saveFavorites(@RequestBody List<FavoritesDto> favoritesDtoList){
        try{
            for(FavoritesDto favoritesDto : favoritesDtoList){
                String userId = favoritesDto.getUser_id();
                favoritesService.deleteFavorite(userId);
            }
            for(FavoritesDto favoritesDto : favoritesDtoList){
                favoritesService.createFavorites(favoritesDto);
            }
            return ResponseEntity.ok("저장완료");
        } catch (Exception e){
            return ResponseEntity.ok("저장실패");
        }

    }
}
