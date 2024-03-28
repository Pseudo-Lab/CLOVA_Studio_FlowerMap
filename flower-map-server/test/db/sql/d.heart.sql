CREATE TABLE `heart` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `modified_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `heart_id` int NOT NULL AUTO_INCREMENT,
  `user_ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `feed_id` int DEFAULT NULL,
  PRIMARY KEY (`heart_id`),
  UNIQUE KEY `IDX_2211b4829ea0a3f78e177c609b` (`user_ip`,`feed_id`),
  KEY `FK_002d52a0e5ba948091b97a1730b` (`feed_id`),
  CONSTRAINT `FK_002d52a0e5ba948091b97a1730b` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;