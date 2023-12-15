from haversine import haversine, Unit
import pandas as pd

def calculate_distance(selected_point, df):
    # 위경도를 숫자로 변환
    selected_point['lat'] = pd.to_numeric(selected_point['lat'])
    selected_point['lng'] = pd.to_numeric(selected_point['lng'])
    df['lat'] = pd.to_numeric(df['lat'])
    df['lng'] = pd.to_numeric(df['lng'])
    
    # 거리 계산
    df['distance'] = df.apply(lambda row: haversine((selected_point['lat'].iloc[0], selected_point['lng'].iloc[0]),
                                                    (row['lat'], row['lng']), unit=Unit.KILOMETERS), axis=1)
    return df

# 선택한 지점을 기준으로 데이터프레임을 거리에 따라 정렬하는 함수
def sort_by_distance(selected_point, df):
    df_with_distance = calculate_distance(selected_point, df)
    # 소숫점 두 자리까지 표시
    df_with_distance['distance'] = df_with_distance['distance'].round(2)
    sorted_df = df_with_distance.sort_values(by='distance')
   
    return sorted_df

