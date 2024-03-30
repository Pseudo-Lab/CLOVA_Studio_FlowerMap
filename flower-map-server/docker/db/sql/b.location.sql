CREATE TABLE IF NOT EXISTS`location` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `modified_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `location_id` int NOT NULL AUTO_INCREMENT,
  `number_address` varchar(255) NOT NULL,
  `road_address` varchar(255) NOT NULL,
  `name` varchar(15) NOT NULL,
  `coordinates` point NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;