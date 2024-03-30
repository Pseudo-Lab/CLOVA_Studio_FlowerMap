CREATE TABLE `feed` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `modified_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `feed_id` int NOT NULL AUTO_INCREMENT,
  `user_ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `captured_at` datetime NOT NULL,
  `location_id` int NOT NULL,
  PRIMARY KEY (`feed_id`),
  KEY `FK_fbbe0454316f64a5f248bee770c` (`location_id`),
  CONSTRAINT `FK_fbbe0454316f64a5f248bee770c` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;