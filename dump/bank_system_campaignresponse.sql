CREATE DATABASE  IF NOT EXISTS `bank_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bank_system`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bank_system
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `campaignresponse`
--

DROP TABLE IF EXISTS `campaignresponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaignresponse` (
  `response_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `campaign_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `response` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `channel` varchar(50) DEFAULT NULL,
  `conversion_score` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`response_id`),
  KEY `customer_id` (`customer_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `campaignresponse_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `campaignresponse_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaignresponse`
--

LOCK TABLES `campaignresponse` WRITE;
/*!40000 ALTER TABLE `campaignresponse` DISABLE KEYS */;
INSERT INTO `campaignresponse` VALUES (1,1,101,1,'Accepted','2025-10-13 16:09:40','Email',90.00),(2,2,102,2,'Declined','2025-10-13 16:09:40','SMS',45.50),(3,3,103,3,'Viewed','2025-10-13 16:09:40','App',60.00),(4,4,104,4,'Accepted','2025-10-13 16:09:40','Web',88.00),(5,5,105,5,'Clicked','2025-10-13 16:09:40','Email',70.00),(6,6,106,6,'Declined','2025-10-13 16:09:40','SMS',40.00),(7,7,107,7,'Accepted','2025-10-13 16:09:40','App',85.00),(8,8,108,8,'Viewed','2025-10-13 16:09:40','Web',65.00),(9,9,109,9,'Clicked','2025-10-13 16:09:40','Email',50.00),(10,10,110,10,'Declined','2025-10-13 16:09:40','SMS',35.00);
/*!40000 ALTER TABLE `campaignresponse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-13 23:04:06
