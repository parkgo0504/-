package com.jeju.planner.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.jpa.repository.Modifying;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface FavoriteMapper {

    @Select("SELECT a.*, b.addr, b.lat, b.lng, b.img, b.alltag, b.tourtype, b.name, b.raddr,b.tag,b.intro,\n"+
            "b.tel, b.city, b.smallcity\n"+
            "FROM tb_favorites a, tb_allattr_test b\n"+
            "WHERE a.attr_num = b.attr_num\n"+
            "AND a.user_id = #{user_id}")
    List<HashMap<String, Object>> selectFavorite(@Param("user_id")String user_id);

    @Modifying
    @Delete("DELETE FROM tb_favorites a WHERE a.user_id = #{user_id}")
    void delete(@Param("user_id")String user_id);
}
