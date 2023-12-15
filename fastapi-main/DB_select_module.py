import pymysql
import pandas as pd

def get_user_favorites(user_id):
    connection = pymysql.connect(host = "project-db-cgi.smhrd.com",port=3307,user="ai2_t1",password ='ai2_t111',db='ai2_t1',charset='utf8')
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    sql = 'use ai2_t1'
    cursor.execute(sql)
    datas = cursor.fetchall()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    sql = f'''
    SELECT a.*,b.name, b.addr, b.lat, b.lng, b.img, b.alltag, b.tourtype, b.raddr, b.tag, b.intro,
                b.tel, b.city, b.smallcity
    FROM tb_favorites a, tb_allattr_test b
    WHERE a.attr_num = b.attr_num
    AND a.user_id = '{user_id}'
    '''
    cursor.execute(sql)
    datas = cursor.fetchall()
    
    return datas
