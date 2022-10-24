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
-- Table structure for table `time_dim`
--

DROP TABLE IF EXISTS `time_dim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_dim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hour` int NOT NULL,
  `miniute` int NOT NULL,
  `second` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_dim`
--

LOCK TABLES `time_dim` WRITE;
/*!40000 ALTER TABLE `time_dim` DISABLE KEYS */;
INSERT INTO `time_dim` VALUES (1,24,24,59),(2,20,15,0),(3,18,0,0),(4,23,30,0),(5,21,0,0),(6,18,30,0),(7,2,0,0),(8,22,30,0),(9,20,0,0),(10,1,45,0),(11,1,30,0),(12,22,0,0),(13,2,15,0),(14,19,30,0),(15,3,0,0),(16,2,45,0),(17,3,15,0),(18,2,30,0),(19,0,30,0),(20,1,0,0),(21,0,0,0),(22,20,5,0),(23,1,15,0),(24,19,0,0),(25,21,5,0),(26,21,15,0),(27,23,45,0),(28,22,15,0),(29,23,15,0),(30,23,0,0),(31,20,30,0),(32,0,15,0),(33,3,30,0),(34,18,45,0),(35,19,45,0),(36,22,10,0),(37,22,7,0),(38,19,37,0),(39,21,7,0),(40,23,10,0),(41,18,5,0),(42,0,20,0),(43,20,35,0),(44,20,45,0),(45,19,15,0),(46,2,35,0),(47,17,15,0),(48,18,15,0),(49,22,5,0),(50,23,5,0),(51,23,35,0),(52,17,30,0),(53,0,35,0),(54,17,0,0);
/*!40000 ALTER TABLE `time_dim` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-18 21:02:11
