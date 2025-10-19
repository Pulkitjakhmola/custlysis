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
-- Table structure for table `recommendationlog`
--

DROP TABLE IF EXISTS `recommendationlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendationlog` (
  `rec_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `model_version` varchar(50) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted` tinyint(1) DEFAULT '0',
  `feedback` text,
  PRIMARY KEY (`rec_id`),
  KEY `customer_id` (`customer_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `recommendationlog_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `recommendationlog_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendationlog`
--

LOCK TABLES `recommendationlog` WRITE;
/*!40000 ALTER TABLE `recommendationlog` DISABLE KEYS */;
INSERT INTO `recommendationlog` VALUES (1,1,2,85.00,'v1.2','2025-10-13 16:09:59',1,'Useful recommendation'),(2,2,3,78.50,'v1.2','2025-10-13 16:09:59',0,'Not relevant to current needs'),(3,3,1,65.00,'v1.2','2025-10-13 16:09:59',0,'Already using similar product'),(4,4,4,90.00,'v1.2','2025-10-13 16:09:59',1,'Loved the UPI features'),(5,5,5,75.00,'v1.2','2025-10-13 16:09:59',1,'Good travel coverage'),(6,6,6,60.00,'v1.2','2025-10-13 16:09:59',0,'Prefer unsecured loans'),(7,7,7,82.00,'v1.2','2025-10-13 16:09:59',1,'Great fund mix'),(8,8,8,80.50,'v1.2','2025-10-13 16:09:59',1,'OPD cover is a plus'),(9,9,9,55.00,'v1.2','2025-10-13 16:09:59',0,'Limited use case'),(10,10,10,68.50,'v1.2','2025-10-13 16:09:59',1,'Fits my startup needs');
/*!40000 ALTER TABLE `recommendationlog` ENABLE KEYS */;
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
