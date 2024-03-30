CREATE TABLE `location_flower` (
  `location_id` int NOT NULL,
  `flower_id` int NOT NULL,
  PRIMARY KEY (`location_id`,`flower_id`),
  KEY `IDX_0edc03267f4871e8e6b39ffafc` (`location_id`),
  KEY `IDX_41b933133348e205a03b82351d` (`flower_id`),
  CONSTRAINT `FK_0edc03267f4871e8e6b39ffafc8` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_41b933133348e205a03b82351d5` FOREIGN KEY (`flower_id`) REFERENCES `flower` (`flower_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;