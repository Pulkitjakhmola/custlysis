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
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `txn_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `txn_type` varchar(255) DEFAULT NULL,
  `amount` decimal(38,2) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `channel` varchar(255) DEFAULT NULL,
  `merchant_category` varchar(255) DEFAULT NULL,
  `geo_location` varchar(255) DEFAULT NULL,
  `is_recurring` tinyint(1) DEFAULT '0',
  `is_high_value` tinyint(1) DEFAULT '0',
  `txn_score` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`txn_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (3,3,'Debit',800.00,'2025-10-13 16:08:26','ATM','Fuel','Lucknow',1,0,65.00),(4,4,'Debit',1500.00,'2025-10-13 16:08:26','App','Dining','Pune',0,0,70.20),(5,5,'Credit',30000.00,'2025-10-13 16:08:26','Web','Travel','Chennai',0,1,88.00),(6,6,'Debit',600.00,'2025-10-13 16:08:26','ATM','Pharmacy','Jaipur',1,0,60.50),(7,7,'Debit',2500.00,'2025-10-13 16:08:26','Mobile','Apparel','Ahmedabad',0,0,75.00),(8,8,'Credit',12000.00,'2025-10-13 16:08:26','App','Books','Kochi',0,0,68.50),(9,9,'Debit',400.00,'2025-10-13 16:08:26','Branch','Utilities','Varanasi',1,0,55.00),(10,10,'Debit',1800.00,'2025-10-13 16:08:26','Mobile','Grocery','Bhopal',0,0,72.30);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
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
