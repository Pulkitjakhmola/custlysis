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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `account_type` varchar(255) DEFAULT NULL,
  `balance` decimal(38,2) DEFAULT NULL,
  `avg_monthly_txn` decimal(38,2) DEFAULT NULL,
  `overdraft_enabled` tinyint(1) DEFAULT '0',
  `last_active_date` datetime DEFAULT NULL,
  `tenure_months` int DEFAULT NULL,
  `channel_preferences` varchar(255) DEFAULT NULL,
  `dormant_flag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`account_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (2,2,'Current',85000.00,40000.00,0,'2025-10-12 09:15:00',18,'Web, ATM',0),(3,3,'Savings',30000.00,10000.00,0,'2025-09-30 16:45:00',12,'Mobile',1),(4,4,'Savings',95000.00,20000.00,1,'2025-10-11 11:00:00',14,'App, Branch',0),(5,5,'Current',120000.00,35000.00,1,'2025-10-13 08:45:00',30,'Web, Mobile',0),(6,6,'Savings',28000.00,8000.00,0,'2025-10-01 17:20:00',10,'ATM',1),(7,7,'Savings',110000.00,27000.00,1,'2025-10-12 13:00:00',22,'Mobile, Web',0),(8,8,'Current',67000.00,15000.00,0,'2025-10-09 15:30:00',16,'App',0),(9,9,'Savings',22000.00,5000.00,0,'2025-09-29 10:10:00',8,'Branch',1),(10,10,'Savings',88000.00,18000.00,1,'2025-10-10 12:00:00',20,'Mobile, ATM',0),(11,NULL,'qwerty',454425.00,NULL,NULL,NULL,12,NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
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
