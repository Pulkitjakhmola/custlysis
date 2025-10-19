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
-- Table structure for table `customerproductinteraction`
--

DROP TABLE IF EXISTS `customerproductinteraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerproductinteraction` (
  `interaction_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `usage_score` decimal(5,2) DEFAULT NULL,
  `satisfaction` int DEFAULT NULL,
  `feedback` text,
  `last_used` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `cross_sell_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`interaction_id`),
  KEY `customer_id` (`customer_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `customerproductinteraction_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `customerproductinteraction_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `customerproductinteraction_chk_1` CHECK ((`satisfaction` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerproductinteraction`
--

LOCK TABLES `customerproductinteraction` WRITE;
/*!40000 ALTER TABLE `customerproductinteraction` DISABLE KEYS */;
INSERT INTO `customerproductinteraction` VALUES (1,1,1,85.00,5,'Great returns on FD','2025-10-11 10:00:00',1,1),(2,2,2,70.50,4,'Useful credit card','2025-10-09 18:30:00',1,0),(3,3,3,60.00,3,'Slow loan processing','2025-09-28 12:15:00',0,0),(4,4,4,90.00,5,'Smooth UPI experience','2025-10-12 14:00:00',1,1),(5,5,5,75.00,4,'Good coverage abroad','2025-10-10 09:45:00',1,0),(6,6,6,65.00,3,'Quick disbursal','2025-10-08 11:30:00',1,0),(7,7,7,80.00,4,'Diversified fund','2025-10-07 16:20:00',1,1),(8,8,8,78.50,5,'Cashless OPD is helpful','2025-10-06 13:10:00',1,1),(9,9,9,55.00,2,'Limited currency options','2025-10-05 17:00:00',0,0),(10,10,10,68.00,3,'Approval took time','2025-10-04 15:30:00',1,0);
/*!40000 ALTER TABLE `customerproductinteraction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-13 23:04:05
