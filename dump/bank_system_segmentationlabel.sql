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
-- Table structure for table `segmentationlabel`
--

DROP TABLE IF EXISTS `segmentationlabel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `segmentationlabel` (
  `customer_id` int NOT NULL,
  `segment_id` varchar(50) NOT NULL,
  `segment_name` varchar(100) DEFAULT NULL,
  `assigned_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `model_version` varchar(50) DEFAULT NULL,
  `segment_score` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`customer_id`,`segment_id`),
  CONSTRAINT `segmentationlabel_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `segmentationlabel`
--

LOCK TABLES `segmentationlabel` WRITE;
/*!40000 ALTER TABLE `segmentationlabel` DISABLE KEYS */;
INSERT INTO `segmentationlabel` VALUES (1,'SEG001','High Value Urban','2025-10-13 16:09:46','v1.2',88.50),(2,'SEG002','Medium Risk Metro','2025-10-13 16:09:46','v1.2',72.00),(3,'SEG003','Low Engagement Rural','2025-10-13 16:09:46','v1.2',60.30),(4,'SEG004','Digital Savvy','2025-10-13 16:09:46','v1.2',85.00),(5,'SEG005','Frequent Traveler','2025-10-13 16:09:46','v1.2',78.00),(6,'SEG006','Loan Seeker','2025-10-13 16:09:46','v1.2',65.00),(7,'SEG007','Investment Focused','2025-10-13 16:09:46','v1.2',82.00),(8,'SEG008','Health Conscious','2025-10-13 16:09:46','v1.2',80.50),(9,'SEG009','Currency Sensitive','2025-10-13 16:09:46','v1.2',55.00),(10,'SEG010','Startup Enthusiast','2025-10-13 16:09:46','v1.2',68.50);
/*!40000 ALTER TABLE `segmentationlabel` ENABLE KEYS */;
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
