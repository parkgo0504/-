package com.jeju.planner.service;
import com.jeju.planner.dto.FavoritesDto;
import com.jeju.planner.entity.FavoritesEntity;
import com.jeju.planner.mapper.FavoriteMapper;
import com.jeju.planner.repository.FavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;


@Service
public class FavoritesService {

    private final FavoritesRepository favoritesRepository;
    private final FavoriteMapper favoriteMapper;


    @Autowired
    public FavoritesService(FavoritesRepository favoritesRepository, FavoriteMapper favoriteMapper) {
        this.favoritesRepository = favoritesRepository;
        this.favoriteMapper = favoriteMapper;

    }

    public FavoritesEntity createFavorites(FavoritesDto favoriteDto){
        FavoritesEntity favoritesEntity = new FavoritesEntity();
        favoritesEntity.setFav_num(favoriteDto.getFav_num());
        favoritesEntity.setUser_id(favoriteDto.getUser_id());
        favoritesEntity.setAttr_num(favoriteDto.getAttr_num());
        return favoritesRepository.save(favoritesEntity);
    }

    /*public void deleteFavorites(int fav_num){
        favoritesRepository.deleteById(String.valueOf(fav_num));
    }*/


    public List<HashMap<String,Object>> selectFavorites(String user_id){
        System.out.println(favoriteMapper.selectFavorite(user_id));
        return favoriteMapper.selectFavorite(user_id);
    }

    public void deleteFavorite(String user_id){
        favoriteMapper.delete(user_id);
    }


}