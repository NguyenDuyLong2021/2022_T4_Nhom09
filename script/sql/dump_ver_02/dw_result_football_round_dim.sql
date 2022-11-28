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
-- Table structure for table `round_dim`
--

DROP TABLE IF EXISTS `round_dim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `round_dim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_round` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `round_dim`
--

LOCK TABLES `round_dim` WRITE;
/*!40000 ALTER TABLE `round_dim` DISABLE KEYS */;
INSERT INTO `round_dim` VALUES (1,'  Round 8'),(2,'  Round 6'),(3,'  Round 5'),(4,'  Round 4'),(5,'  Round 3'),(6,'  Round 2'),(7,'  Round 1'),(8,'  Round 38'),(9,'  Round 18'),(10,'  Round 27'),(11,'  Round 33'),(12,'  Round 37'),(13,'  Round 22'),(14,'  Round 21'),(15,'  Round 30'),(16,'  Round 36'),(17,'  Round 35'),(18,'  Round 34'),(19,'  Round 25'),(20,'  Round 32'),(21,'  Round 19'),(22,'  Round 31'),(23,'  Round 20'),(24,'  Round 16'),(25,'  Round 29'),(26,'  Round 28'),(27,'  Round 13'),(28,'  Round 26'),(29,'  Round 24'),(30,'  Round 17'),(31,'  Round 23'),(32,'  Round 15'),(33,'  Round 14'),(34,'  Round 12'),(35,'  Round 11'),(36,'  Round 10'),(37,'  Round 9'),(38,'  Round 7'),(39,'  Round 42'),(40,'  Round 41'),(41,'  Round 40'),(42,'  Round 39');
/*!40000 ALTER TABLE `round_dim` ENABLE KEYS */;
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
