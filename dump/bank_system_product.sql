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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `sub_category` varchar(255) DEFAULT NULL,
  `features` text,
  `risk_level` varchar(255) DEFAULT NULL,
  `eligibility_rules` text,
  `avg_rating` decimal(38,2) DEFAULT NULL,
  `popularity_score` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'1','44',NULL,NULL,'44',NULL,NULL,NULL),(2,'Gold Credit Card','Credit','Card','Rewards, cashback, EMI options','Medium','Min income ?5L/year',4.20,75.50),(3,'Home Loan Plus','Loan','Mortgage','Low interest, long tenure','High','Min salary ?50,000/month',4.00,82.30),(4,'Digital Wallet','Payments','Wallet','Instant transfers, UPI','Low','KYC required',4.60,90.10),(5,'Travel Insurance','Insurance','Travel','Global coverage, emergency support','Medium','Age < 65',4.10,70.00),(6,'Gold Loan','Loan','Secured','Quick disbursal, low interest','High','Gold collateral',3.90,65.00),(7,'Mutual Fund X','Investment','Mutual Fund','Diversified portfolio','Medium','Min SIP ?500',4.30,78.00),(8,'Health Shield','Insurance','Health','Cashless network, OPD cover','Medium','Age < 60',4.40,80.50),(9,'Forex Card','Payments','Card','Multi-currency, low fees','Low','Passport required',4.00,72.00),(10,'Startup Loan','Loan','Business','Flexible EMI, fast approval','High','Business registration',3.80,68.50);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
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
