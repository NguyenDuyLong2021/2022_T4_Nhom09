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
-- Table structure for table `reference_dim`
--

DROP TABLE IF EXISTS `reference_dim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference_dim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_reference` varchar(50) DEFAULT NULL,
  `nation` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference_dim`
--

LOCK TABLES `reference_dim` WRITE;
/*!40000 ALTER TABLE `reference_dim` DISABLE KEYS */;
INSERT INTO `reference_dim` VALUES (1,' Oliver M. (Eng)',NULL),(2,' Coote D. (Eng)',NULL),(3,' Hooper S. (Eng)',NULL),(4,' Pawson C. (Eng)',NULL),(5,' Taylor A. (Eng)',NULL),(6,' Harrington T. (Eng)',NULL),(7,' Gillett J. (Aus)',NULL),(8,' Tierney P. (Eng)',NULL),(9,' Jones R. (Eng)',NULL),(10,' Madley A. (Eng)',NULL),(11,' Salisbury M. (Eng)',NULL),(12,' Attwell S. (Eng)',NULL),(13,' Brooks J. (Eng)',NULL),(14,' Marriner A. (Eng)',NULL),(15,' Bankes P. (Eng)',NULL),(16,' England D. (Eng)',NULL),(17,' Bramall T. (Eng)',NULL),(18,' Scott G. (Eng)',NULL),(19,' Friend K. (Eng)',NULL),(20,' Dean M. (Eng)',NULL),(21,' Atkinson M. (Eng)',NULL),(22,' Moss J. (Eng)',NULL),(23,' Kavanagh C. (Eng)',NULL),(24,' Gillet J. (Aus)',NULL),(25,' Mason L. (Eng)',NULL),(26,' Tierney P. (Eng) -  Dean M. (Eng)',NULL),(27,' Robinson T. (Eng)',NULL),(28,' Langford O. (Eng)',NULL),(29,' East R. (Eng)',NULL),(30,' Probert L. (Eng)',NULL),(31,' Swarbrick N. (Eng)',NULL),(32,' Jones M. (Eng)',NULL),(33,' Madley R. (Eng)',NULL),(34,' Madley R. (Eng) -  Moss J. (Eng)',NULL),(35,' Clattenburg M. (Eng)',NULL),(36,' Stroud K. (Eng)',NULL),(37,' Foy C. (Eng)',NULL),(38,' Foy C. (Eng) -  Taylor A. (Eng)',NULL),(39,' Dowd P. (Eng)',NULL),(40,' Webb H. (Eng)',NULL),(41,' Halsey M. (Eng)',NULL),(42,'unknown',NULL),(43,' Webb D. (Eng)',NULL),(44,' Walton P. (Eng)',NULL),(45,' Bennett S. (Eng)',NULL),(46,' Wiley A. (Eng)',NULL),(47,'Emirates Stadium (London)',NULL),(48,'Villa Park (Birmingham)',NULL),(49,'Ewood Park (Blackburn)',NULL),(50,'Craven Cottage (London)',NULL),(51,'MKM Stadium (Hull)',NULL),(52,'Anfield (Liverpool)',NULL),(53,'Etihad Stadium (Manchester)',NULL),(54,'Stadium of Light (Sunderland)',NULL),(55,'Boleyn Ground (London)',NULL),(56,'DW Stadium (Wigan)',NULL),(57,'Fratton Park (Portsmouth)',NULL),(58,'Stamford Bridge (London)',NULL),(59,'The Hawthorns (West Bromwich)',NULL),(60,'University of Bolton Stadium (Bolton)',NULL),(61,'Goodison Park (Liverpool)',NULL),(62,'Riverside Stadium (Middlesbrough)',NULL),(63,'St. James\' Park (Newcastle)',NULL),(64,'Bet365 Stadium (Stoke on Trent)',NULL),(65,'White Hart Lane (London)',NULL),(66,'Old Trafford (Manchester)',NULL),(67,'St. Andrew\'s Stadium (Birmingham)',NULL),(68,'Pride Park (Derby)',NULL),(69,'Select Car Leasing Stadium (Reading)',NULL),(70,'Bramall Lane (Sheffield)',NULL),(71,'Vicarage Road (Watford)',NULL),(72,'The Valley (London)',NULL),(73,'Highbury (London)',NULL),(74,'St. Mary\'s Stadium (Southampton)',NULL),(75,'Selhurst Park (London)',NULL),(76,'Carrow Road (Norwich)',NULL),(77,'Molineux Stadium (Wolverhampton)',NULL),(78,'Elland Road (Leeds)',NULL),(79,'King Power Stadium (Leicester)',NULL),(80,'Maine Road (Manchester)',NULL),(81,'Portman Road (Ipswich)',NULL),(82,'Highfield Road (Coventry)',NULL),(83,'Valley Parade (Bradford)',NULL),(84,'Roker Park (Sunderland)',NULL),(85,'Ayresome Park (Middlesbrough)',NULL),(86,'Plough Lane (London)',NULL),(87,'Meadow Lane (Nottingham)',NULL),(88,'Kenilworth Road (Luton)',NULL);
/*!40000 ALTER TABLE `reference_dim` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-30 16:21:36
