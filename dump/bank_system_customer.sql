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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `marital_status` varchar(255) DEFAULT NULL,
  `educational_level` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `income_bracket` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `geo_cluster` varchar(255) DEFAULT NULL,
  `digital_score` decimal(38,2) DEFAULT NULL,
  `risk_profile` varchar(255) DEFAULT NULL,
  `preferred_language` varchar(255) DEFAULT NULL,
  `tenure_days` int DEFAULT NULL,
  `churn_risk_score` decimal(38,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'wwww',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Moderate',NULL,NULL,1.00,NULL),(2,'qw',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Aggressive',NULL,NULL,45.00,NULL),(3,'Ravi Kumar','1992-07-08','Male','Single','Graduate','Sales Executive','Low','Lucknow','Semi-urban',65.00,'Conservative','Hindi',365,0.60,'2025-10-13 16:06:02'),(4,'Sneha Joshi','1995-03-15','Female','Married','Postgrad','Data Analyst','Medium','Pune','Urban',78.90,'Moderate','English',400,0.35,'2025-10-13 16:06:02'),(5,'Arjun Verma','1988-09-30','Male','Single','Graduate','Banker','High','Chennai','Urban',90.20,'Aggressive','English',820,0.20,'2025-10-13 16:06:02'),(6,'Neha Singh','1993-12-01','Female','Single','Graduate','Teacher','Low','Jaipur','Semi-urban',60.50,'Conservative','Hindi',290,0.55,'2025-10-13 16:06:02'),(7,'Karan Patel','1987-06-18','Male','Married','Postgrad','Consultant','High','Ahmedabad','Urban',85.00,'Moderate','English',670,0.30,'2025-10-13 16:06:02'),(8,'Divya Nair','1991-04-25','Female','Single','Graduate','Designer','Medium','Kochi','Urban',75.40,'Aggressive','English',510,0.40,'2025-10-13 16:06:02'),(9,'Manoj Tiwari','1984-08-10','Male','Married','High School','Retail Manager','Low','Varanasi','Rural',55.00,'Conservative','Hindi',180,0.70,'2025-10-13 16:06:02'),(10,'Isha Kapoor','1996-02-20','Female','Single','Postgrad','Researcher','Medium','Bhopal','Semi-urban',68.70,'Moderate','English',350,0.50,'2025-10-13 16:06:02');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
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
