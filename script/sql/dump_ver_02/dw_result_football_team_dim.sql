-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: dw_result_football
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `team_dim`
--

DROP TABLE IF EXISTS `team_dim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_dim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_team` varchar(100) NOT NULL,
  `code_team` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_dim`
--

LOCK TABLES `team_dim` WRITE;
/*!40000 ALTER TABLE `team_dim` DISABLE KEYS */;
INSERT INTO `team_dim` VALUES (1,'Everton',NULL),(2,'Brentford',NULL),(3,'Tottenham',NULL),(4,'Newcastle',NULL),(5,'Wolves',NULL),(6,'Aston Villa',NULL),(7,'Nottingham',NULL),(8,'Manchester Utd',NULL),(9,'Brighton',NULL),(10,'Chelsea',NULL),(11,'Leicester',NULL),(12,'Liverpool',NULL),(13,'West Ham',NULL),(14,'Arsenal',NULL),(15,'Bournemouth',NULL),(16,'Manchester City',NULL),(17,'Leeds',NULL),(18,'Southampton',NULL),(19,'Crystal Palace',NULL),(20,'Fulham',NULL),(21,'Burnley',NULL),(22,'Norwich',NULL),(23,'Watford',NULL),(24,'Sheffield Utd',NULL),(25,'West Brom',NULL),(26,'Huddersfield',NULL),(27,'Cardiff',NULL),(28,'Swansea',NULL),(29,'Stoke',NULL),(30,'Hull',NULL),(31,'Middlesbrough',NULL),(32,'Sunderland',NULL),(33,'QPR',NULL),(34,'Wigan',NULL),(35,'Reading',NULL),(36,'Blackburn',NULL),(37,'Bolton',NULL),(38,'Birmingham',NULL),(39,'Blackpool',NULL),(40,'Portsmouth',NULL),(41,'Derby',NULL),(42,'Charlton',NULL),(43,'Ipswich',NULL),(44,'Coventry',NULL),(45,'Bradford City',NULL),(46,'Sheffield Wed',NULL),(47,'Wimbledon FC',NULL),(48,'Barnsley',NULL),(49,'Swindon',NULL),(50,'Oldham',NULL),(51,'Notts Co',NULL),(52,'Luton',NULL),(53,'Millwall',NULL);
/*!40000 ALTER TABLE `team_dim` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-26 17:31:11
