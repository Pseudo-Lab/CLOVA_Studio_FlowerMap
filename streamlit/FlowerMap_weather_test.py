import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# 한글 폰트 설정
plt.rcParams['font.family'] = "AppleGothic"
# Windows, 리눅스 사용자
# plt.rcParams['font.family'] = "NanumGothic"
plt.rcParams['axes.unicode_minus'] = False

data = pd.read_csv('../기상청 크롤링_2020~2024_2~3월 기온_서울.csv', encoding='utf-8')
data = data.drop('Unnamed: 0',axis=1)
data['년월일']=pd.to_datetime(data['년월일'])
data_1 = data.copy()
data['년월일']=pd.to_datetime(data['년월일']).dt.date

st.title('*StreamLit으로 데이터 시각화하기* :sparkles:')

st.header('2~3월 서울 지역별 기후 데이터')
st.subheader('데이터 프레임')
st.checkbox("전체 너비 맞추기", value=False, key="use_container_width")
st.dataframe(data , use_container_width=st.session_state.use_container_width)


selected_region = st.selectbox(
    '어떤 지역을 고르시겠습니까?',
    ('강남', '강동', '강북*', '강서', '관악', '광진', '구로', '금천', '기상청', '김포(공)',
       '남현', '노원', '도봉', '동대문', '마포', '서대문', '서울', '서초', '성동', '성북',
       '송파 *', '양천', '영등포 *', '용산', '은평', '중구', '중랑', '한강', '현충원'))


 #차트1
data_1['연도'] = data_1['년월일'].dt.year 
data_1 = data_1.drop(['년월일','지역 코드'],axis=1)
data_1=data_1.groupby(['연도','지역명']).mean()
data_1.reset_index(drop=False,inplace=True)
#---
st.subheader('서울 최저 기온')
fig, ax = plt.subplots()
colors = ['tab:blue', 'tab:orange', 'tab:green', 'tab:red', 'tab:purple',
          'tab:brown', 'tab:pink']

data_filtered = data_1[data_1['연도'].isin([2020, 2024])]

for i, year in enumerate([2020, 2024]):
    ax.plot(data_filtered['지역명'][data_filtered['연도'] == year], 
             data_filtered['최저기온(℃)'][data_filtered['연도'] == year], 
             label=str(year), color=colors[i])

ax.set_xlabel('지역명')
ax.set_ylabel('최저기온(℃)')
ax.set_title('지역별 최저기온') 
ax.set_xticklabels(data_filtered['지역명'], rotation=45)
ax.legend()
st.pyplot(fig)
