-- Flower
INSERT INTO flower
    (flower_id, name)
VALUES
    (1, '벚꽃'),
    (2, '개나리'),
    (3, '장미');

-- Location
INSERT INTO location
    (location_id, name, number_address, road_address, coordinates)
VALUES 
    (1, '봉천로', '서울특별시 관악구 신림동 1677-5', '서울특별시 관악구 봉천로', POINT(126.9010178, 37.484761)),
    (2, '성현로', '서울특별시 관악구 봉천동 1703-2', '서울특별시 관악구 성현로', POINT(126.956268, 37.490829)),
    (3, '신림동길', '서울특별시 관악구 신림동 1467-16', '서울특별시 관악구 신림동길', POINT(126.923861, 37.486626)),
    (4, '양녕로', '서울특별시 관악구 봉천동 978-7', '서울특별시 관악구 양녕로', POINT(126.9452014, 37.4822319)),
    (5, '관악로30길', '서울특별시 관악구 봉천동 1706-3', '서울특별시 관악구 관악로30길', POINT(126.9572967, 37.48631726)),
    (6, '관천로', '서울특별시 관악구 신림동 1642-10', '서울특별시 관악구 관천로', POINT(126.931884, 37.478713)),
    (7, '낙성대로', '서울특별시 관악구 봉천동 산37-2', '서울특별시 관악구 낙성대로', POINT(126.9563269, 37.4679287)),
    (8, '난곡로', '서울특별시 관악구 신림동 502', '서울특별시 관악구 난곡로', POINT(126.9130798, 37.486201)),
    (9, '남부순환로', '서울특별시 관악구 사당역', '서울특별시 관악구 남부순환로', POINT(127.0704912, 37.49657205)),
    (10, '서애로', '서울특별시 중구 선일빌딩~퇴계로4가 교차로', '서울특별시 중구 서애로', POINT(126.996165, 37.559506)),
    (11, '풍성로', '서울특별시 강동구 영파여고앞 교차로', '서울특별시 강동구 풍성로', POINT(127.071743, 37.315901)),
    (12, '고덕로', '서울특별시 강동구 토끼굴입구교차로', '서울특별시 강동구 고덕로', POINT(127.073023, 37.331715)),
    (13, '구천면로', '서울특별시 강동구 한영고교차로', '서울특별시 강동구 구천면로', POINT(127.092215, 37.325712)),
    (14, '동남로', '서울특별시 강동구 둔촌동 229-2', '서울특별시 강동구 동남로', POINT(127.083725, 37.310172)),
    (15, '상일로', '서울특별시 강동구 상일동 359-3', '서울특별시 강동구 상일로', POINT(127.102501, 37.324909)),
    (16, '올림픽로', '서울특별시 강동구 풍납사거리', '서울특별시 강동구 올림픽로', POINT(127.070976, 37.314035)),
    (17, '아리수로 50길', '서울특별시 강동구 고덕동 673', '서울특별시 강동구 아리수로 50길', POINT(127.090574, 37.333163)),
    (18, '아리수로 93가길', '서울특별시 강동구 강일1단지 교차로', '서울특별시 강동구 아리수로 93가길', POINT(127.102485, 37.340339)),
    (19, '진황도로', '서울특별시 강동구 둔촌동 118-2', '서울특별시 강동구 진황도로', POINT(127.084675, 37.312466)),
    (20, '천중로', '서울특별시 강동구 천호동 256-3', '서울특별시 강동구 천중로', POINT(127.091161, 37.322535)),
    (21, '천호대로 157길', '서울특별시 강동구 성내동 9-2', '서울특별시 강동구 천호대로 157길', POINT(127.073585, 37.321635)),
    (22, '신월로27길', '서울특별시 양천구 신진자동차경정비', '서울특별시 양천구', POINT(126.843739, 37.521083)),
    (23, '신정중앙로', '서울특별시 양천구 큰사랑교회', '서울특별시 양천구', POINT(126.851634, 37.528045)),
    (24, '오목로4길', '서울특별시 양천구 삼종레이빌아파트', '서울특별시 양천구 오목로4길', POINT(126.840021, 37.521498)),
    (25, '화곡로4길', '서울특별시 양천구 신월5동주민센터', '서울특별시 양천구 화곡로4길', POINT(126.826915, 37.539325)),
    (26, '신정이펜1로', '서울특별시 양천구 신정이펜하우스1단지', '서울특별시 양천구 신정이펜1로', POINT(126.827701, 37.516316)),
    (27, '신정이펜2로', '서울특별시 양천구 신정이펜하우스2단지', '서울특별시 양천구 신정이펜2로', POINT(126.832004, 37.516285)),
    (28, '선사로', '서울특별시 강동구 천호동 461-161', '서울특별시 강동구 선사로', POINT(127.071609, 37.322358));

-- Feed
INSERT INTO feed
    (feed_id, captured_at, location_id, user_ip, content, password)
VALUES
    (1, '2024-03-15 19:00:00', 8, '223.23.123.231', '꽃이 정말 아름다워요!', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (2, '2024-03-16 08:32:15', 14, '112.65.32.87', '오늘은 꽃구경을 하러 나들이를 갔어요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (3, '2024-03-17 13:45:59', 22, '211.124.58.104', '집 근처 공원에 꽃이 많이 피어 있어서 기분이 좋아요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (4, '2024-03-18 11:20:42', 10, '121.183.76.29', '꽃 냄새가 정말 상큼하고 좋아요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (5, '2024-03-19 16:55:20', 18, '58.39.221.15', '오늘은 꽃집에서 예쁜 꽃을 사왔어요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (6, '2024-03-20 09:10:37', 3, '125.212.94.72', '창가에 꽃을 놓으니 분위기가 달라져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (7, '2024-03-21 14:28:55', 25, '211.167.53.88', '꽃다발을 선물 받아서 기분이 너무 좋아요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (8, '2024-03-15 22:07:11', 16, '115.82.37.19', '꽃마을에 가서 많은 꽃을 둘러보았어요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (9, '2024-03-16 07:40:30', 6, '221.193.112.209', '집 앞 정원에 꽃들이 피어나서 너무 예뻐요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (10, '2024-03-17 12:15:18', 12, '118.64.28.77', '꽃밭에서 산책하니 기분이 확 풀려요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (11, '2024-03-18 10:05:06', 28, '219.47.90.132', '꽃을 키우는 것이 정말 힐링이 돼요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (12, '2024-03-19 15:30:40', 20, '114.72.89.61', '발코니에 꽃을 놓으니 분위기가 확 밝아져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (13, '2024-03-20 08:20:57', 5, '123.157.45.104', '나무 밑에 핀 꽃을 보며 커피를 마시니 기분이 좋아요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (14, '2024-03-21 13:05:25', 24, '222.86.17.29', '꽃을 바라보며 하루를 시작하니 마음이 평화로워져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (15, '2024-03-16 06:55:12', 9, '218.36.55.122', '바쁜 일상에서도 꽃구경을 하면 마음이 편안해져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (16, '2024-03-17 11:22:40', 4, '121.158.92.76', '화창한 날씨에 꽃놀이를 가니 기분이 너무 좋았어요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (17, '2024-03-18 09:30:18', 19, '211.34.187.59', '집 근처 공원에서 꽃구경을 하니 힐링이 돼요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (18, '2024-03-19 14:10:36', 26, '118.246.39.72', '저는 꽃을 보면 마음이 편안해지는 것 같아요. 여유로워져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (19, '2024-03-20 07:40:59', 7, '219.47.135.88', '꽃다발을 받으면 마음이 들뜨고 기분이 좋아져요. 선물로도 좋아요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (20, '2024-03-21 12:00:25', 15, '112.189.53.97', '퇴근 후에 꽃집에 들러서 꽃 한 송이씩 사서 집에 꾸며요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (21, '2024-03-15 20:30:45', 2, '114.51.62.33', '밤하늘을 보면서 꽃의 아름다움을 느껴요. 자연의 아름다움에 감탄해요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (22, '2024-03-16 09:15:37', 21, '218.173.66.110', '꽃을 보며 잠시나마 일상을 잊을 수 있어서 좋아요. 힐링이 돼요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (23, '2024-03-17 10:05:21', 1, '121.86.47.109', '꽃밭에서 뛰어노니 마음이 너무 풍요로워져요. 즐거움이 가득해요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (24, '2024-03-18 15:45:10', 27, '211.58.92.201', '꽃이 피는 모습을 보며 생명력을 느껴요. 자연의 신비로움에 감탄해요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (25, '2024-03-19 08:20:30', 11, '114.57.33.128', '꽃 향기에 취해서 나른한 오후를 보내는 건 최고에요. 행복한 시간이에요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (26, '2024-03-20 11:30:55', 23, '115.68.88.167', '꽃을 담은 병을 보면 마음이 따뜻해지고 포근해져요. 아늑한 느낌이에요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (27, '2024-03-21 09:05:43', 13, '125.164.72.213', '꽃을 키우는 건 정말 힐링이에요. 하루에 한 번씩 꽃을 물 주는 건 즐거운 일이에요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (28, '2024-03-15 21:48:03', 17, '116.129.77.98', '꽃을 볼 때마다 마음이 편안해지고 기분이 좋아져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (29, '2024-03-16 14:10:25', 10, '112.89.45.71', '꽃이 있는 곳에는 항상 행복이 있는 것 같아요. 그래서 좋아해요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (30, '2024-03-17 17:30:50', 3, '211.56.78.94', '나른한 오후에 차 한 잔과 함께 꽃을 보며 여유로운 시간을 보내는 건 최고에요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (31, '2024-03-18 10:55:12', 20, '118.32.66.123', '꽃잎 하나하나가 하나씩 피어나는 모습을 보면 마음이 따뜻해져요. 행복한 느낌이에요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (32, '2024-03-19 11:40:33', 8, '114.72.88.77', '꽃의 아름다움은 늘 저를 감동시켜요. 자연의 아름다움에 감사해요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (33, '2024-03-20 16:25:48', 1, '223.88.29.45', '꽃을 보면 어려운 일들을 잊을 수 있어요. 마음이 가라앉아요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (34, '2024-03-21 08:15:20', 18, '112.45.79.31', '아침에 일어나서 창문을 열면 꽃들이 반기고 있어요. 기분이 좋아져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (35, '2024-03-15 22:55:05', 5, '116.82.34.156', '집안 곳곳에 꽃을 꽂으면 분위기가 달라져요. 아늑한 느낌이 들어요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (36, '2024-03-16 13:20:37', 22, '219.57.88.24', '꽃이 있는 곳에는 늘 행복이 있는 것 같아요. 그래서 꽃을 좋아해요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (37, '2024-03-17 08:40:58', 11, '114.68.92.103', '꽃밭을 걷는 것은 정말 즐거운 일이에요. 힐링이 되는 시간이에요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (38, '2024-03-18 12:30:15', 24, '211.45.76.208', '꽃들이 피어나는 모습을 보면 마음이 흐뭇해져요. 자연의 아름다움에 감사해요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (39, '2024-03-19 09:55:27', 19, '125.88.77.42', '꽃잎 하나하나가 아름다운데, 그것을 보는 것만으로도 마음이 편안해져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (40, '2024-03-20 15:10:34', 6, '219.65.33.77', '꽃다발을 받은 순간 행복한 기분이 들어요. 따뜻한 마음이 들어와요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (41, '2024-03-21 07:45:49', 13, '112.77.88.109', '꽃을 바라보며 하루를 시작하니 기분이 좋아져요. 마음이 행복해져요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (42, '2024-03-15 23:20:55', 28, '116.39.88.126', '꽃 향기를 맡으면 마음이 편안해져요. 힐링이 되는 기분이에요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (43, '2024-03-16 12:05:37', 15, '112.67.98.31', '창가에 꽃을 놓으니 분위기가 달라져요. 아늑한 느낌이 들어요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.'),
    (44, '2024-03-17 08:35:58', 22, '114.45.87.203', '꽃들이 핀 모습을 보며 행복한 마음이 들어요. 자연의 아름다움에 감사해요.', '$2b$10$yFS8UjFE3OesZz1ym0n5POfYtZndje.qp4n6lxx13Oe8jTJOKHhH.');

-- Heart
INSERT INTO heart
    (heart_id, feed_id, user_ip)
VALUES
    (1, 3, '114.45.87.203'),
    (2, 5, '116.39.88.126'),
    (3, 7, '125.88.77.42'),
    (4, 9, '112.77.88.109'),
    (5, 11, '112.67.98.31'),
    (6, 13, '121.86.47.109'),
    (7, 15, '112.89.45.71'),
    (8, 17, '114.51.62.33'),
    (9, 19, '121.158.92.76'),
    (10, 21, '121.164.72.213'),
    (11, 23, '116.129.77.98'),
    (12, 25, '118.32.66.123'),
    (13, 27, '118.246.39.72'),
    (14, 29, '125.164.72.213'),
    (15, 31, '125.164.72.213'),
    (16, 33, '223.88.29.45'),
    (17, 35, '218.36.55.122'),
    (18, 37, '211.56.78.94'),
    (19, 39, '223.23.123.231'),
    (20, 41, '219.47.135.88'),
    (21, 43, '219.57.88.24'),
    (22, 41, '211.45.76.208'),
    (23, 39, '116.82.34.156'),
    (24, 37, '114.68.92.103'),
    (25, 35, '112.189.53.97'),
    (26, 33, '114.72.88.77'),
    (27, 31, '112.45.79.31'),
    (28, 29, '112.173.66.110'),
    (29, 27, '116.129.77.98'),
    (30, 25, '125.88.77.42'),
    (31, 23, '118.32.66.123'),
    (32, 21, '121.164.72.214'),
    (33, 19, '122.158.92.76'),
    (34, 17, '116.39.88.126'),
    (35, 15, '121.86.47.109'),
    (36, 13, '118.246.39.72'),
    (37, 11, '113.67.98.31'),
    (38, 9, '116.82.34.156'),
    (39, 7, '211.56.78.94'),
    (40, 5, '223.23.123.231'),
    (41, 3, '115.45.87.203'),
    (42, 5, '116.49.88.126'),
    (43, 7, '125.89.77.42'),
    (44, 19, '112.77.88.109'),
    (45, 10, '112.67.98.31'),
    (46, 12, '121.86.47.109'),
    (47, 19, '112.89.45.71'),
    (48, 16, '114.51.62.33'),
    (49, 19, '131.158.92.76'),
    (50, 21, '131.164.72.213'),
    (51, 23, '126.129.77.98'),
    (52, 25, '128.32.66.123'),
    (53, 27, '118.236.39.72'),
    (54, 29, '115.164.72.213'),
    (55, 31, '125.124.72.213'),
    (56, 33, '223.882.29.45'),
    (57, 35, '218.363.55.122'),
    (58, 37, '211.562.78.94'),
    (59, 39, '223.232.123.231'),
    (60, 41, '219.471.135.88');

-- Image
INSERT INTO image
    (image_id, user_ip, origin_url, origin_e_tag, thumb_url, thumb_e_tag, idx, flowering_status, feed_id, flower_id)
VALUES
    (1, '111.222.333.444', '72488dd0-c5b2-4c7a-9ae8-8acda06406dd.png', 'etag1', 'a2035967-995c-4673-b7cf-5a66470dcfc0.jpeg', 'thumbetag1', 0, 2, 23, 1),
    (2, '222.333.444.555', '8f6bcbc3-668f-467b-8c11-5fc2eb5be19a.png', 'etag2', 'da4add57-c363-434d-aa5a-2df61860613d.jpeg', 'thumbetag2', 2, 3, 11, 2),
    (3, '333.444.555.666', 'a0e889da-30de-43d1-8478-aefefd2917af.png', 'etag3', 'd0968ee7-c775-4193-8a04-42555d86fa95.jpeg', 'thumbetag3', 1, 1, 30, 3),
    (4, '444.555.666.777', '94276036-a015-417f-836f-d9d4e9d81048.png', 'etag4', '059bb0c0-38c5-43a1-993c-e911b9d356bc.jpeg', 'thumbetag4', 0, 4, 8, 1),
    (5, '555.666.777.888', 'de018f09-d440-4220-9bdd-ecb6df501ba6.png', 'etag5', 'ae388d4d-f85f-4ec4-b8a7-772401ef4d57.jpeg', 'thumbetag5', 2, 0, 41, 2),
    (6, '111.222.333.444', '8f6bcbc3-668f-467b-8c11-5fc2eb5be19a.png', 'etag6', 'a2035967-995c-4673-b7cf-5a66470dcfc0.jpeg', 'thumbetag6', 1, 2, 17, 3),
    (7, '222.333.444.555', 'a0e889da-30de-43d1-8478-aefefd2917af.png', 'etag7', 'da4add57-c363-434d-aa5a-2df61860613d.jpeg', 'thumbetag7', 0, 3, 5, 1),
    (8, '333.444.555.666', '94276036-a015-417f-836f-d9d4e9d81048.png', 'etag8', '059bb0c0-38c5-43a1-993c-e911b9d356bc.jpeg', 'thumbetag8', 2, 1, 29, 2),
    (9, '444.555.666.777', 'de018f09-d440-4220-9bdd-ecb6df501ba6.png', 'etag9', 'ae388d4d-f85f-4ec4-b8a7-772401ef4d57.jpeg', 'thumbetag9', 1, 4, 13, 3),
    (10, '555.666.777.888', '72488dd0-c5b2-4c7a-9ae8-8acda06406dd.png', 'etag10', 'a2035967-995c-4673-b7cf-5a66470dcfc0.jpeg', 'thumbetag10', 0, 0, 42, 1),
    (11, '666.777.888.999', 'a0e889da-30de-43d1-8478-aefefd2917af.png', 'etag11', 'd0968ee7-c775-4193-8a04-42555d86fa95.jpeg', 'thumbetag11', 1, 2, 7, 2),
    (12, '777.888.999.000', '94276036-a015-417f-836f-d9d4e9d81048.png', 'etag12', '059bb0c0-38c5-43a1-993c-e911b9d356bc.jpeg', 'thumbetag12', 2, 3, 14, 3),
    (13, '111.222.333.444', 'de018f09-d440-4220-9bdd-ecb6df501ba6.png', 'etag13', 'ae388d4d-f85f-4ec4-b8a7-772401ef4d57.jpeg', 'thumbetag13', 0, 0, 19, 1),
    (14, '222.333.444.555', '72488dd0-c5b2-4c7a-9ae8-8acda06406dd.png', 'etag14', 'a2035967-995c-4673-b7cf-5a66470dcfc0.jpeg', 'thumbetag14', 1, 1, 28, 2),
    (15, '333.444.555.666', '8f6bcbc3-668f-467b-8c11-5fc2eb5be19a.png', 'etag15', 'da4add57-c363-434d-aa5a-2df61860613d.jpeg', 'thumbetag15', 0, 2, 3, 3),
    (16, '444.555.666.777', 'a0e889da-30de-43d1-8478-aefefd2917af.png', 'etag16', 'd0968ee7-c775-4193-8a04-42555d86fa95.jpeg', 'thumbetag16', 2, 0, 35, 1),
    (17, '555.666.777.888', '94276036-a015-417f-836f-d9d4e9d81048.png', 'etag17', '059bb0c0-38c5-43a1-993c-e911b9d356bc.jpeg', 'thumbetag17', 1, 4, 10, 2),
    (18, '666.777.888.999', 'de018f09-d440-4220-9bdd-ecb6df501ba6.png', 'etag18', 'ae388d4d-f85f-4ec4-b8a7-772401ef4d57.jpeg', 'thumbetag18', 0, 3, 21, 3),
    (19, '777.888.999.000', '72488dd0-c5b2-4c7a-9ae8-8acda06406dd.png', 'etag19', 'a2035967-995c-4673-b7cf-5a66470dcfc0.jpeg', 'thumbetag19', 2, 1, 38, 1),
    (20, '111.222.333.444', '8f6bcbc3-668f-467b-8c11-5fc2eb5be19a.png', 'etag20', 'da4add57-c363-434d-aa5a-2df61860613d.jpeg', 'thumbetag20', 1, 2, 16, 2),
    (21, '222.333.444.555', 'a0e889da-30de-43d1-8478-aefefd2917af.png', 'etag21', 'd0968ee7-c775-4193-8a04-42555d86fa95.jpeg', 'thumbetag21', 0, 1, 22, 3),
    (22, '333.444.555.666', '94276036-a015-417f-836f-d9d4e9d81048.png', 'etag22', '059bb0c0-38c5-43a1-993c-e911b9d356bc.jpeg', 'thumbetag22', 1, 2, 32, 1),
    (23, '444.555.666.777', 'de018f09-d440-4220-9bdd-ecb6df501ba6.png', 'etag23', 'ae388d4d-f85f-4ec4-b8a7-772401ef4d57.jpeg', 'thumbetag23', 2, 3, 20, 2),
    (24, '555.666.777.888', '72488dd0-c5b2-4c7a-9ae8-8acda06406dd.png', 'etag24', 'a2035967-995c-4673-b7cf-5a66470dcfc0.jpeg', 'thumbetag24', 0, 0, 12, 3),
    (25, '666.777.888.999', '8f6bcbc3-668f-467b-8c11-5fc2eb5be19a.png', 'etag25', 'da4add57-c363-434d-aa5a-2df61860613d.jpeg', 'thumbetag25', 1, 1, 24, 1),
    (26, '777.888.999.000', 'a0e889da-30de-43d1-8478-aefefd2917af.png', 'etag26', 'd0968ee7-c775-4193-8a04-42555d86fa95.jpeg', 'thumbetag26', 2, 2, 36, 2),
    (27, '111.222.333.444', '94276036-a015-417f-836f-d9d4e9d81048.png', 'etag27', '059bb0c0-38c5-43a1-993c-e911b9d356bc.jpeg', 'thumbetag27', 0, 3, 7, 3),
    (28, '222.333.444.555', 'de018f09-d440-4220-9bdd-ecb6df501ba6.png', 'etag28', 'ae388d4d-f85f-4ec4-b8a7-772401ef4d57.jpeg', 'thumbetag28', 1, 4, 25, 1),
    (29, '333.444.555.666', '72488dd0-c5b2-4c7a-9ae8-8acda06406dd.png', 'etag29', 'a2035967-995c-4673-b7cf-5a66470dcfc0.jpeg', 'thumbetag29', 2, 0, 39, 2),
    (30, '444.555.666.777', '8f6bcbc3-668f-467b-8c11-5fc2eb5be19a.png', 'etag30', 'da4add57-c363-434d-aa5a-2df61860613d.jpeg', 'thumbetag30', 0, 1, 5, 3);

-- Location Flower
INSERT INTO location_flower
    (location_id, flower_id)
VALUES
    (1, 2),
    (2, 3),
    (3, 1),
    (4, 2),
    (5, 3),
    (6, 1),
    (7, 3),
    (8, 1),
    (9, 2),
    (10, 3),
    (11, 1),
    (12, 3),
    (13, 2),
    (14, 1),
    (15, 3),
    (16, 2),
    (17, 1),
    (18, 3),
    (19, 2),
    (20, 1),
    (21, 3),
    (22, 1),
    (23, 2),
    (24, 3),
    (25, 1),
    (26, 2),
    (27, 3),
    (28, 1);