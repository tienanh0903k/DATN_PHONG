-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: graduationproject
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('1334e1d9-e52c-404b-90b4-ac200f997808','bbaf438ea1f19302e0721e66c9ec33f2a6424ab46458e902a55f94f220d3e1d4','2025-03-24 02:36:54.444','20250324023654_update',NULL,NULL,'2025-03-24 02:36:54.366',1),('29407896-dcc8-4931-ba39-9c4ea87fe02d','991ab2f4e6ea39785e0a36dbe18261d7ad4fd80191b1ab371641e054fbdd97d9','2025-04-23 03:49:43.129','20250423034943_create_table_status_bills',NULL,NULL,'2025-04-23 03:49:43.029',1),('2aa690c2-f976-4e09-9c1c-f04edb59f085','848bdb5651a3ced8c6de81322ff47b83eee45e15cf4a7b5d97041c18d6af9d97','2025-05-19 14:55:05.075','20250519145504_update_table_rating',NULL,NULL,'2025-05-19 14:55:05.050',1),('388d4620-a965-49ee-9093-958fcd544112','d7f2ca99e2202d9293685fcc7c03851ddad9def5b5d318fb66a9d23f2c70b2f7','2025-01-02 07:02:22.946','20250102070221_create_database',NULL,NULL,'2025-01-02 07:02:21.632',1),('7fac02e5-29eb-419f-b289-951192a209e4','784c112d844684477fbcc375578eb1a8a8617f94b0fcd2c1cc87d9fb1e074cef','2025-01-02 07:01:27.686','20241224064808_create_database',NULL,NULL,'2025-01-02 07:01:27.587',1),('8a7a9e76-5dc8-4203-af44-285a9d671dfc','5e9071a1e6e49073450bf96ff716022680ec26e132b0990b1e138d550aa296e3','2025-03-14 04:09:29.026','20250314040928_update',NULL,NULL,'2025-03-14 04:09:28.989',1),('8df3c948-bc60-4cda-9809-e3600910a951','797a0b952dfd0f07a09d7a641ee0339d261bfcc2ddff575272521d271995cadb','2025-05-19 07:30:14.005','20250519073013_update_table_rating',NULL,NULL,'2025-05-19 07:30:13.894',1),('96709b2d-b9e6-4105-b7a2-34f6e71ab6a2','64deed44ab204937a810125e4d6bf82814377a7542acbf15d434a880dfac9ec7','2025-04-17 03:58:52.883','20250417035852_update_table_cart',NULL,NULL,'2025-04-17 03:58:52.630',1),('97e5408f-c9e6-43de-878a-c8ae5eb28669','63d34933351d6be055a5f88910e36d041cdf94b12f2514e2dc9c7388fce5ed5b','2025-04-17 07:41:03.905','20250417074103_edit_table_cart',NULL,NULL,'2025-04-17 07:41:03.881',1),('ad0848ff-dc22-4a6a-a031-6754245a0b29','ead2fbc942a7d32420cd5790e8be1fb58e15ff6385daee5209e8f3830b0b9bcc','2025-05-31 15:53:16.361','20250531155316_update_table_bill',NULL,NULL,'2025-05-31 15:53:16.324',1),('bce6bd93-5090-40e1-82b1-482c6ac3c5d8','75634a79344d7c13082e01541e0847334f3be49a177c88ce4ad45daaa1712110','2025-05-14 09:32:28.298','20250514093228_create_table_message',NULL,NULL,'2025-05-14 09:32:28.148',1),('c89d2d9a-4e50-4b07-8011-28c701f21e0b','b7948b3be2b38c8000b6f5c5c90b2a4dc5498ffb8b5e1067d618a4c75b009bd2','2025-05-25 05:38:00.022','20250525053759_update_table_products',NULL,NULL,'2025-05-25 05:37:59.952',1),('dcd1ac70-3f67-4557-824c-cf931d45d00b','56a8bbed171db008778a837b04c89a91aaf14f540a340530dbb567f14d9bfc67','2025-03-23 11:49:25.605','20250323114925_update',NULL,NULL,'2025-03-23 11:49:25.552',1),('e4d5bf5d-7a8c-4b4c-9457-0c84f825773d','eda05b5d9e73ac1ebc64d829f2d559ee2bf9946f2a1b2102091ed4a5ab5ef43b','2025-04-16 02:49:49.362','20250416024949_update_table_products',NULL,NULL,'2025-04-16 02:49:49.325',1),('e8001f15-1088-4792-b03b-51349283acd4','9cf61c7c9d4aff5d9084f9de21f6670e2a81d45e04997d8f179df1ccd40af174','2025-04-22 07:09:35.126','20250422070935_update_table_bill',NULL,NULL,'2025-04-22 07:09:35.095',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `accountId` int NOT NULL AUTO_INCREMENT,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountTypeId` int NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Salt` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`accountId`),
  KEY `Account_accountTypeId_fkey` (`accountTypeId`),
  CONSTRAINT `Account_accountTypeId_fkey` FOREIGN KEY (`accountTypeId`) REFERENCES `accounttype` (`accountTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (5,'',3,'active','acelinhphong@gmail.com','AH2iHEQIjrrF8wbH'),(6,'',2,'active','lingphong286@gmail.com','g9mpvUYpouf8S0Dl'),(7,'$2b$10$YFRM0U/m0W5OWiXmWDSYiuJ4EyiGnT71SQCcglnTWkUKuRha.Qcpe',3,'pending','+84862889603','8ikO25g3rsujQ1hK'),(8,'',3,'active','phongnguyen2863@gmail.com','66nP5VzUCPIWOrWh'),(10,'$2b$10$el7zMZqvahonySqCe8q0UuJffkZRml9q21bAdeI8Y0WIKr8plbo5K',3,'active','nguyennhatminh010403@gmail.com','$2b$10$el7zMZqvahonySqCe8q0Uu'),(11,'',3,'active','nguyentienphu04081978@gmail.com','8QCiiNcDJF0x9M7Q'),(12,'$2b$10$PJCsfoicfyon0TvMbFt/Juk8Ljwu/5gLymzezzJOaAv3lQIuEHjlC',1,'active','admin@gmail.com','$2b$10$PJCsfoicfyon0TvMbFt/Ju'),(13,'$2b$10$dJQTzGoOF/4AhL/fZ3zzqegQbipAlskUoDCx7Lpzh3XPdNiUYXAdy',2,'active','phong@gmail.com','$2b$10$dJQTzGoOF/4AhL/fZ3zzqe'),(14,'$2b$10$6RLJ.bsy82mdORZKCfV1uuGsaapBbjlLaEa/N6BjExDP0GsGVgo8e',2,'active','uyennga1310@gmail.com','$2b$10$6RLJ.bsy82mdORZKCfV1uu'),(15,'$2b$10$y.rExWsdEAOky82ANV2/9OCievJqqsQLt4odD5x0n6N/lxQ/Zk7S.',3,'active','doctor@gmail.com','$2b$10$y.rExWsdEAOky82ANV2/9O');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounttype`
--

DROP TABLE IF EXISTS `accounttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounttype` (
  `accountTypeId` int NOT NULL AUTO_INCREMENT,
  `accountTypeName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`accountTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounttype`
--

LOCK TABLES `accounttype` WRITE;
/*!40000 ALTER TABLE `accounttype` DISABLE KEYS */;
INSERT INTO `accounttype` VALUES (1,'Admin'),(2,'Shop'),(3,'customer');
/*!40000 ALTER TABLE `accounttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `billId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `numberPhone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statusId` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`billId`),
  KEY `Bill_customerId_fkey` (`customerId`),
  KEY `Bill_statusId_fkey` (`statusId`),
  CONSTRAINT `Bill_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Bill_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `statusbill` (`statusId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (14,4,'0862889603','Toàn Thắng, Kim Động, Hưng Yên',6,'2025-05-31 22:53:16.329'),(15,6,'','',1,'2025-05-31 22:53:16.329'),(16,1,'0862889603','An Viên, Tiên Lữ, Hưng Yên',6,'2025-05-31 22:53:16.329'),(17,9,'0978623134','Toàn Thắng, Kim Động, Hưng Yên',6,'2025-05-31 22:53:16.329'),(18,9,'0978623134','Toàn Thắng, Kim Động, Hưng Yên',6,'2025-05-31 22:53:16.329'),(19,1,'0862889603','Toàn Thắng, Kim Động, Hưng Yên',2,'2025-05-31 22:53:16.329'),(20,4,'0862889603','Toàn Thắng, Kim Động, Hưng Yên',1,'2025-05-31 22:53:16.329'),(21,4,'0862889603',', , ',1,'2025-05-31 22:53:16.329'),(22,4,'0862889603',', , ',1,'2025-05-31 22:53:16.329'),(23,4,'0862889603',', , ',6,'2025-05-31 22:53:16.329'),(24,4,'0862889603',', , ',6,'2025-05-31 22:53:16.329'),(25,6,'','Bành Trạch, Ba Bể, Bắc Kạn',2,'2025-06-01 02:12:50.266'),(27,6,'','Bành Trạch, Ba Bể, Bắc Kạn',5,'2025-06-01 03:21:04.638'),(28,8,'0978683836','Minh Đạo, Tiên Du, Bắc Ninh',6,'2025-06-04 08:56:51.606'),(29,8,'0978683836','Minh Đạo, Tiên Du, Bắc Ninh',6,'2025-06-04 09:12:20.043'),(30,1,'0862889603','Toàn Thắng, Kim Động, Hưng Yên',6,'2025-06-05 01:44:18.236'),(31,1,'0862889603','Toàn Thắng, Kim Động, Hưng Yên',6,'2025-06-05 01:55:37.323'),(32,1,'0862889603','Toàn Thắng, Kim Động, Hưng Yên',6,'2025-06-05 02:22:27.086'),(33,1,'0862889603','Toàn Thắng, Kim Động, Hưng Yên',6,'2025-06-05 02:23:51.023'),(34,4,'0862889603',', , ',6,'2025-06-05 02:27:39.535'),(35,4,'0862889603',', , ',6,'2025-06-05 02:30:04.517'),(36,4,'0862889603',', , ',6,'2025-06-05 02:31:27.791'),(37,4,'0862889603',', , ',6,'2025-06-05 02:32:12.496'),(38,4,'0862889603',', , ',6,'2025-06-05 02:36:13.597'),(39,4,'0862889603','Kim Long, Châu Đức, Bà Rịa - Vũng Tàu',6,'2025-06-05 02:45:06.531');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billdetail`
--

DROP TABLE IF EXISTS `billdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billdetail` (
  `billDetailId` int NOT NULL AUTO_INCREMENT,
  `billId` int NOT NULL,
  `quantity` int NOT NULL,
  `totalPrice` double NOT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`billDetailId`),
  KEY `BillDetail_billId_fkey` (`billId`),
  KEY `BillDetail_id_fkey` (`id`),
  CONSTRAINT `BillDetail_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `bill` (`billId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BillDetail_id_fkey` FOREIGN KEY (`id`) REFERENCES `productvariant` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billdetail`
--

LOCK TABLES `billdetail` WRITE;
/*!40000 ALTER TABLE `billdetail` DISABLE KEYS */;
INSERT INTO `billdetail` VALUES (21,14,1,70000,1),(22,15,1,70000,1),(23,16,1,35000,4),(24,17,1,21000000,31),(25,18,1,1890000,27),(26,19,7,1120000,17),(27,19,7,145000,18),(28,20,1,132000,15),(29,21,1,132000,15),(30,22,1,132000,15),(31,23,1,35000,4),(32,24,1,285000,13),(33,25,1,32000,5),(35,27,1,145000,18),(36,28,1,285000,11),(37,29,1,285000,11),(38,30,1,215000,24),(39,31,1,223000,23),(40,32,1,1800000,28),(41,33,1,21000000,30),(42,34,1,21000000,29),(43,35,1,1800000,28),(44,36,1,1890000,27),(45,37,1,1999000,26),(46,38,1,80000,1),(47,39,1,21000000,31);
/*!40000 ALTER TABLE `billdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `customerId` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cartId`),
  KEY `Cart_id_fkey` (`id`),
  KEY `Cart_customerId_fkey` (`customerId`),
  CONSTRAINT `Cart_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Cart_id_fkey` FOREIGN KEY (`id`) REFERENCES `productvariant` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (3,2,4,1),(5,1,6,1),(14,30,6,1),(16,17,1,7),(17,18,1,2),(18,18,6,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentCategoryId` int DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Thời trang & Phụ kiện',0,'active'),(2,'Thời trang nữ',1,'active'),(3,'Thời trang nam',1,'active'),(4,'Quần jeans, quần tây',3,'active'),(5,'Áo sơ mi, áo thun',3,'active'),(6,'Giày, dép nam',3,'active'),(7,'Váy đầm, áo kiểu',2,'active'),(8,'Giày cao gót, sneaker',2,'active'),(9,'Phụ kiện thời trang',1,'active'),(10,'Đồng hồ',9,'active'),(11,'Kính mắt',9,'active'),(12,'Trang sức',9,'active'),(13,'Điện tử - Công nghệ',0,'active'),(14,'Điện thoại & Phụ kiện',13,'active'),(15,'Điện thoại di động',14,'active'),(16,'Máy tính bảng',14,'active'),(17,'Ốp lưng, bao da',14,'active'),(18,'Pin sạc dự phòng',14,'active'),(19,'Tai nghe, loa Bluetooth',14,'active'),(20,'Máy tính & Laptop',13,'active'),(21,'Laptop',20,'active'),(22,'PC - Máy tính để bàn',20,'active'),(23,'Màn hình máy tính',20,'active'),(24,'Bàn phím, chuột, phụ kiện',20,'active'),(25,'Thiết bị thông minh',13,'active'),(26,'Smartwatch',25,'active'),(27,'Vòng đeo tay thông minh',25,'active'),(28,'Thiết bị nhà thông minh (đèn, camera, cảm biến)',25,'active'),(29,'Mỹ phẩm & Làm đẹp',0,'active'),(30,'Chăm sóc da',29,'active'),(31,'Kem dưỡng da',30,'active'),(32,'Sữa rửa mặt',30,'active'),(33,'Serum, toner',30,'active'),(34,'Trang điểm',29,'active'),(35,'Chăm sóc tóc & cơ thể',29,'active'),(36,'Son môi',34,'active'),(37,'Kem nền, phấn phủ',34,'active'),(38,'Mascara, kẻ mắt',34,'active'),(39,'Dầu gội, dầu xả',35,'active'),(40,'Sữa tắm, dưỡng thể',35,'active'),(41,'Nước hoa',35,'active'),(42,'Mẹ & Bé',0,'active'),(43,'Nhà cửa & Đời sống',0,'active'),(44,'Thể thao & Du lịch',0,'active'),(45,'Ô tô & Xe máy',0,'active'),(46,'Thư viện sách',0,'active'),(47,'Máy ảnh - Máy quay phim',0,'active'),(48,'phụ kiện nam',3,'active'),(49,'Winter Jackets & Coats',3,'active');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customerId` int NOT NULL AUTO_INCREMENT,
  `accountId` int NOT NULL,
  `customerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` datetime(3) NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numberPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`customerId`),
  UNIQUE KEY `Customer_accountId_key` (`accountId`),
  CONSTRAINT `Customer_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account` (`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,5,'Phong Nguyen','https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/avatar/1-1748487665399-obito.png','acelinhphong@gmail.com','2025-03-12 10:00:00.000','Toàn Thắng, Kim Động, Hưng Yên','nam','active','','0862889603'),(2,6,'Phong Nguyen','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/avatar/2-1742972005333-toy.png','lingphong286@gmail.com','2025-03-04 10:00:00.000','','nam','active','abc','0979623134'),(3,7,'customer','https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1','','2025-03-19 09:33:23.773','','','pending',NULL,NULL),(4,8,'phong dep trai','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/avatar/4-1747300330684-photo-3.png','phongnguyen2863@gmail.com','2025-05-16 10:00:00.000','Kim Long, Châu Đức, Bà Rịa - Vũng Tàu','nam','active','','0862889603'),(6,10,'Minh lan1','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/avatar/6-1747368000728-photo-3.png','nguyennhatminh010403@gmail.com','2025-04-30 10:00:00.000','Bành Trạch, Ba Bể, Bắc Kạn','nam','active','tồ',''),(7,11,'ph Ong','https://lh3.googleusercontent.com/a/ACg8ocLTEwQUp-x2ptLhe8xNlAsRJyYauXPJmTuLNbSeSZQ7G8tj9nBJ=s96-c','nguyentienphu04081978@gmail.com','2025-05-15 09:06:56.431','','','active',NULL,''),(8,12,'Admin','https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/avatar/8-1748511064585-anh111.png','admin@gmail.com','2017-06-27 10:00:00.000','Minh Đạo, Tiên Du, Bắc Ninh','nam','active','','0978683836'),(9,13,'palmerr','https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/avatar/9-1748487450504-avt1.png','phong@gmail.com','2025-05-20 10:00:00.000','Toàn Thắng, Kim Động, Hưng Yên','nam','active','','0978623134'),(10,14,'UserQjL','https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1','uyennga1310@gmail.com','1990-01-01 00:00:00.000','An Phú, An Phú, An Giang','','active',NULL,''),(11,15,'UserCJW','https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1','doctor@gmail.com','1990-01-01 00:00:00.000','','','active',NULL,'0979623134');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryaddress`
--

DROP TABLE IF EXISTS `deliveryaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryaddress` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `addressDetail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`addressId`),
  KEY `DeliveryAddress_customerId_fkey` (`customerId`),
  CONSTRAINT `DeliveryAddress_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryaddress`
--

LOCK TABLES `deliveryaddress` WRITE;
/*!40000 ALTER TABLE `deliveryaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `deliveryaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follower`
--

DROP TABLE IF EXISTS `follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follower` (
  `followerId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `shopId` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`followerId`),
  KEY `Follower_customerId_fkey` (`customerId`),
  KEY `Follower_shopId_fkey` (`shopId`),
  CONSTRAINT `Follower_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Follower_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follower`
--

LOCK TABLES `follower` WRITE;
/*!40000 ALTER TABLE `follower` DISABLE KEYS */;
/*!40000 ALTER TABLE `follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `messageId` int NOT NULL AUTO_INCREMENT,
  `senderId` int NOT NULL,
  `senderType` enum('CUSTOMER','SHOP') COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` int DEFAULT NULL,
  `shopId` int DEFAULT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`messageId`),
  KEY `Message_customerId_fkey` (`customerId`),
  KEY `Message_shopId_fkey` (`shopId`),
  CONSTRAINT `Message_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Message_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,4,'CUSTOMER',4,1,'xin chao',0,'2025-05-15 07:51:04.478'),(2,1,'SHOP',4,1,'xin chao ban',0,'2025-05-15 09:25:19.046'),(3,6,'CUSTOMER',6,1,'hello',0,'2025-05-16 04:00:54.592'),(4,1,'SHOP',6,1,'hi',0,'2025-05-16 04:04:32.636'),(5,1,'SHOP',6,1,'chao ban',0,'2025-05-16 04:17:05.175'),(6,6,'CUSTOMER',6,1,'hello',0,'2025-05-16 04:17:31.977'),(7,1,'SHOP',6,1,'tôi có thể giúp gì không',0,'2025-05-16 04:26:48.290'),(8,6,'CUSTOMER',6,1,'tôi muốn mua hàng',0,'2025-05-16 04:27:04.304'),(9,4,'CUSTOMER',4,1,'hello',0,'2025-05-16 04:37:07.367'),(10,1,'SHOP',4,1,'tôi có thể giúp gì không',0,'2025-05-16 04:37:15.971'),(11,1,'SHOP',4,1,'hi',0,'2025-05-16 04:37:24.974'),(12,1,'SHOP',4,1,'tôi có thể giúp gì không',0,'2025-05-16 06:28:33.421'),(13,4,'CUSTOMER',4,1,'co toi muon hoi 1 chut',0,'2025-05-16 06:29:36.615'),(14,4,'CUSTOMER',4,1,'ban co ranh k',0,'2025-05-16 06:31:30.619'),(15,1,'SHOP',4,1,'toi co',0,'2025-05-16 06:42:08.508'),(16,1,'SHOP',4,1,'chao ban',0,'2025-05-16 06:48:20.069'),(17,1,'SHOP',4,1,'hi',0,'2025-05-16 06:48:58.531'),(18,1,'SHOP',4,1,'chao ban',0,'2025-05-16 06:49:50.080'),(19,4,'CUSTOMER',4,1,'co toi muon hoi 1 chut',0,'2025-05-16 06:50:05.681'),(20,4,'CUSTOMER',4,1,'toi muon mua ao',0,'2025-05-16 06:50:38.248'),(21,1,'SHOP',4,1,'tôi có thể giúp gì không',0,'2025-05-16 06:50:56.843'),(22,4,'CUSTOMER',4,1,'co toi muon hoi 1 chut',0,'2025-05-16 06:53:58.613'),(23,1,'SHOP',4,1,'ban muon hoi gi',0,'2025-05-16 06:54:09.764'),(24,4,'CUSTOMER',4,1,'co toi muon hoi 1 chut',0,'2025-05-16 06:55:54.518'),(25,6,'CUSTOMER',6,1,'co toi muon hoi 1 chut',0,'2025-05-17 14:28:18.994'),(26,6,'CUSTOMER',6,1,'bạn có rảnh không',0,'2025-05-17 14:34:21.843'),(27,9,'CUSTOMER',9,1,'tôi muốn được tư vấn',0,'2025-05-31 01:26:57.948'),(28,9,'CUSTOMER',9,3,'hello',0,'2025-06-05 03:40:29.787'),(29,9,'CUSTOMER',9,3,'toi muốn mua hàng',0,'2025-06-05 03:49:10.828'),(30,9,'CUSTOMER',9,3,'mua áo',0,'2025-06-05 03:49:23.827'),(31,3,'SHOP',9,3,'ok bạn',0,'2025-06-05 03:49:29.299');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notifyId` int NOT NULL AUTO_INCREMENT,
  `notifyTypeId` int NOT NULL,
  `customerId` int NOT NULL,
  `notifyName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sentAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`notifyId`),
  KEY `Notification_customerId_fkey` (`customerId`),
  KEY `Notification_notifyTypeId_fkey` (`notifyTypeId`),
  CONSTRAINT `Notification_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Notification_notifyTypeId_fkey` FOREIGN KEY (`notifyTypeId`) REFERENCES `notificationtype` (`notifyTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificationtype`
--

DROP TABLE IF EXISTS `notificationtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificationtype` (
  `notifyTypeId` int NOT NULL AUTO_INCREMENT,
  `notifyTypeName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`notifyTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationtype`
--

LOCK TABLES `notificationtype` WRITE;
/*!40000 ALTER TABLE `notificationtype` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificationtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` int NOT NULL,
  `productDes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopId` int NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`productId`),
  KEY `Products_categoryId_fkey` (`categoryId`),
  KEY `Products_shopId_fkey` (`shopId`),
  CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Products_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `shop` (`shopId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'iphone13',15,'<ul class=\"list-disc pl-4\"><li><p>dep</p></li><li><p>sang</p></li></ul>',1,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/iphone13.png',70000,'active'),(2,'iphone13',15,'<ul class=\"list-disc pl-4\"><li><p>đẹp</p></li><li><p>sang trọng</p></li></ul>',1,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/iphone13.png',70000,'active'),(3,'Thắt lưng nam ⚡️ Giảm Giá Cực Sốc ⚡️ cao cấp, dây nịt nam khóa tự động sang trọng phong cách',48,'<ul class=\"list-disc pl-4\"><li><p>hắt lưng nam có thể đeo đi chơi, dạo phố, dự tiệc đều tạo một phong cách đầy cá tính sang trọng.</p></li><li><p>Có thể dùng Thắt lưng nam làm món quà tặng anh, em, bạn bè đồng nghiệp trong các dịp sự kiện, sinh nhật đều rất đẹp và ý nghĩa.     </p></li><li><p>Tinh xảo và sắc nét được tạo khối  đẹp mắt tạo nên nét sang trọng và đẳng cấp cho món phụ kiện luôn dễ dàng hấp dẫn các quý ông và là điểm sáng tinh tế cho mọi trang phục.     <br></p></li></ul>',2,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748151677721-tld1.webp',29000,'active'),(4,'Áo thun Local Brand Lavi Studio/ Shark',5,'<ul class=\"list-disc pl-4\"><li><p>Đóng gói sản phẩm Áo Thun Oversized Shark: Zip, kèm giấy gói, card thankyou , giấy thơm, lavi shipping bag</p><p><strong>MÔ TẢ SẢN PHẦM</strong></p></li><li><p>Áo Thun Oversized Shark</p></li><li><p>Chất liệu: Cotton Premium</p></li><li><p>• Size: S / M / L / XL</p></li></ul><p><br></p>',2,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748152534229-aoden.webp',113000,'active'),(5,'Chuột Gaming Không Dây Ziyou Attack Shark R1 Siêu Nhẹ Chip Paw3311 Có App và 3 Chế Độ Kết Nối Bluetooth/ Wireless/ TypeC',24,'<p>Lưu ý ae mua chuột chơi game thì không chọn phiên bản F20 ( F20 là phiên bản chuột không dây và bluetooth dành cho văn phòng và game nhẹ nhàng với pin cực trâu và thiết kế đẹp )</p><p>Chơi game anh em cân nhắc lựa chọn F30 hoặc R1 , SC580 và Mchose G3 . ( Có đủ 3 mode ) trong đó F30 và G3 là 2 sự lựa chọn tốt nhất về cả chất lượng và giá cả</p><p></p><ul class=\"list-disc pl-4\"><li><p>R1 : 3 mode kết nối DPI 18,000 có app Marco</p></li><li><p>G3 : 3 mode kết nối DPI 12,000 có app Marco</p></li><li><p>SC580 : 3 mode , DPI 12,000 , có app</p></li><li><p>F30: 3 mode kết nối, DPI 10000, có app Macro</p></li><li><p>F20: 2 mode kết nối, DPI 3200, không có app Macro</p></li><li><p>X7 v2 : Dòng chuột dây chuyên game</p></li><li><p>X11: Dòng chuột chuyên gaming DPI lên tới 18000</p></li></ul>',3,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748234276306-chottrang.webp',260000,'active'),(6,'Bàn phím cơ Gaming Black Shark K4 LED RGB | Có app chỉnh | Stab căn chỉnh sẵn | Plate kim loại | kết nối TypeC tháo rời',24,'<p><strong>THÔNG TIN BÀN PHÍM CƠ BLACK SHARK K4  khung viền kim loại</strong></p><ul class=\"list-disc pl-4\"><li><p>Trục: Blue Switch- Red switch</p></li><li><p>Số Phím: 61</p></li><li><p>LED RGB</p></li><li><p>Có app chỉnh Led Marco</p></li><li><p>Phương thức kết nối: Type-c</p></li><li><p>HƯỚNG DẪN SỬ DỤNG:</p></li><li><p>Hệ thống led: fn+\\| = đổi hiệu ứng đèn led,\\l;</p></li><li><p>fn+.&gt; = Đổi màu Đèn LED</p><p><br></p></li></ul>',3,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748242146612-banphim1.webp',340000,'active'),(7,'Quẩn dài nỉ tăm PN STORE nam nữ cạp chun form suông ống rộng kiểu dáng basic đen be ghi QNI',4,'<p><strong>HƯỚNG DẪN CHỌN SIZE: để chọn được size ưng ý xin quý khách nhắn tin trước với shop ạ</strong></p><ul class=\"list-disc pl-4\"><li><p>size S : 38-52kg/ cao &lt; 1m68</p></li><li><p>size M : 53-62kg/ cao &lt; 1m73</p></li><li><p>size L   : 63-71kg/ cao &lt; 1m78</p></li><li><p>size XL : 71-78kg/ cao &lt; 1m80</p></li><li><p>size 2XL : 78-87kg/ cao &lt; 1m85</p></li></ul><p><strong>HƯỚNG DẪN SỬ DỤNG;</strong></p><ul class=\"list-disc pl-4\"><li><p>Giặt sản phẩm với nước lạnh trước khi sử dụng lần đầu</p></li><li><p>Nếu giặt máy nên chọn chế độ giặt nhẹ</p></li><li><p>Không nên sử dụng chất tẩy</p></li><li><p>Không nên ngâm chung với quần áo phai màu</p><p></p></li></ul>',2,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245271590-quan1.webp',138000,'active'),(8,'Quần KAKI ỐNG RỘNG unisex BIGSIZE 100kg, quần dài form rộng phù hợp cả nam nữ 45-100kg - clothingforgirl mã mã store',4,'<p><strong>THÔNG TIN VỀ SẢN PHẨM CỦA CLOTHING FOR GIRL:</strong></p><p><strong>Mô tả:</strong></p><ul class=\"list-disc pl-4\"><li><p>Chất liệu: kaki</p></li><li><p>Form unisex phù hợp cho cả nam và nữ</p></li><li><p>Size S M L ( xem bảng size)</p></li></ul><p></p><p>- Shop sẵn sàng tư vấn size cho bạn ạ.</p>',2,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245691675-quannu1.webp',156000,'active'),(9,'Quần jean nam ống suông rộng HELLOYOU, quần bò nam xám đen dáng baggy chất jeans bò cao cấp phong cách hàn quốc 2023',4,'<p><strong>THÔNG TIN VỀ SẢN PHẨM QUẦN JEANS BAGGY NAM ỐNG SUÔNG RỘNG</strong></p><ul class=\"list-disc pl-4\"><li><p>Xuất xứ: Việt Nam</p></li><li><p>Chất liệu: 97% cotton, 3% spandex</p></li><li><p>Màu sắc: Xanh Nhạt, Đen Trơn</p></li><li><p>Kiểu dáng: Trơn</p></li><li><p><em>Kích thước: Size 27 </em>36</p></li><li><p>Hãy nhắn tin cho shop để được tư vấn size chuẩn nhất với bạn!</p></li><li><p>Đặc điểm nổi bật:</p></li><li><p>Quần jeans nam ống suông rộng, cạp cao, dáng đứng giúp tạo nên form cực chuẩn cho người mặc.</p></li><li><p>Quần jeans nút cài, có 4 túi lớn rất thuận tiện cho việc đựng smart phone hoặc ví cỡ bự.</p></li><li><p>Quần có màu xanh nhạt và đen trơn được nhuộm kỹ giúp hạn chế tối đa việc phai màu khi sử dụng.</p></li><li><p> Sản phẩm được đảm bảo với quy trình sản xuất chất lượng với đường may chắc chắn, tỉ mỉ từng chi tiết.</p></li></ul><p>*Màu sản phẩm có thể sẽ chênh lệch thực tế một phần nhỏ, do ảnh hưởng về độ lệch màu của ánh sáng nhưng vẫn đảm bảo chất lượng.</p><p><br></p>',2,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245842507-baggy1.webp',140000,'active'),(10,'Áo Khoác Jean Nam Jacket Demin Wash Màu Dơ Bụi Retro Chất Vải Dày Dặn Cao Cấp Đứng From Unisex',5,'<ul class=\"list-disc pl-4\"><li><p>THÔNG TIN SẢN PHẨM </p></li></ul><p>- Chất liệu : Jeans </p><p>- Màu sắc : Đen, xanh nhạt, xanh đậm, xanh retro, đen retro, xanh wash, xanh wash bụi - Size : M, L, XL, XXL  </p><ul class=\"list-disc pl-4\"><li><p>HƯỚNG DẪN CHỌN SIZE</p></li><li><p> Size M: từ 40 - 55kg, Cao 1m55 - 1m67</p></li><li><p> Size L: từ 56 - 62kg , Cao 1m63 - 1m72</p></li><li><p>Size XL: từ 63 - 72kg, Cao 1m68 - 1m78</p></li><li><p>Size XXL: từ 72 - 82kg, Cao 1m72 - 1m83  </p></li></ul><p>✔ Bảng size chỉ mang tính chất tham khảo tương đối, tùy thuộc vào số đo cơ thể mỗi người và chất liệu vải sẽ có sự chênh lệch nhất định. Nếu bạn mua hàng lần đầu hoặc chưa chắc chắn về chọn size, vui lòng inbox cho ROSIN BOUTIQUE để được tư vấn size phù hợp</p>',2,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748247034717-aobo1.webp',220000,'active'),(11,'Điện Thoại Samsung Galaxy A06 - Đã kích hoạt bảo hành điện tử - Hàng Chính Hãng',15,'<p><strong>Màn hình rộng lớn, trải nghiệm tối ưu</strong></p><ul class=\"list-disc pl-4\"><li><p>Galaxy A06 được trang bị kích thước màn hình 6.7 inch thuộc phân khúc lớn, giúp tối ưu hóa trải nghiệm giải trí như xem phim, chơi game hay đọc sách điện tử dễ dàng, rộng rãi hơn.</p></li></ul><p><strong>Thiết kế thanh mảnh, tinh tế</strong></p><ul class=\"list-disc pl-4\"><li><p>Galaxy A06 sở hữu thiết kế thanh mảnh với độ dày từ 8.8 mm xuống còn 8 mm là một cải tiến đáng chú ý về mặt thiết kế (so với tiền nhiệm). Sự thay đổi này mang lại cảm giác cầm nắm thoải mái hơn, đặc biệt là khi bạn sử dụng thiết bị trong thời gian dài.</p></li><li><p>Họa tiết sọc dọc trên mặt lưng Galaxy A06 vừa tăng tính thẩm mỹ vừa hạn chế bám vân tay hiệu quả, giữ cho điện thoại trông luôn sạch sẽ, bóng bẩy, không bị dính dấu tay khó chịu sau khi sử dụng lâu. Galaxy A06 mang đến nhiều tùy chọn màu sắc khác nhau, điều này phù hợp với sở thích và cá tính của nhiều đối tượng người dùng.</p></li></ul>',1,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748426461208-samsung1.webp',1990000,'active'),(12,'Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng',15,'<p><strong>Màn hình với độ sáng thích ứng lớn nhất lên đến 2600 nit</strong></p><ul class=\"list-disc pl-4\"><li><p>Mặt kính Corning Gorilla Armor giúp giảm phản xạ và cải thiện độ sắc nét của hình ảnh, ngay cả dưới ánh sáng mặt trời trực tiếp. Đồng thời công nghệ Vision Booster cải thiện độ tương phản và màu sắc cho khả năng hiển thị rõ nét mang lại trải nghiệm xem ấn tượng.</p></li></ul><p><strong>Khung máy bền bỉ từ titan</strong></p><ul class=\"list-disc pl-4\"><li><p>Với chất liệu titan cứng cáp tạo nên khung máy bền bỉ, kết hợp với khả năng chống trầy xước vượt trội của Kính Corning Gorilla Armor, cùng khả năng kháng nước và bụi đạt chuẩn IP68, Galaxy S24 Ultra sẵn sàng đồng hành cùng bạn trong mọi chuyến phiêu lưu.</p></li></ul><p><strong>ProVisual chụp đêm vẫn rõ như ban ngày</strong></p><ul class=\"list-disc pl-4\"><li><p>Công cụ ProVisual nâng cao nhận dạng vật thể — cải thiện tông màu, giảm nhiễu và làm nổi bật chi tiết đáng kinh ngạc.</p></li><li><p>Kích thước điểm ảnh lớn hơn 1.6 lần và biên độ dao động OIS lớn hơn cho chất lượng hình ảnh và video sáng rõ hơn đến 60% và ổn định hơn đến 40%.</p></li><li><p>Chụp chân dung đêm ấn tượng ấn tượng hơn nữa với AI đo chiều sâu các lớp ảnh và xử lý tín hiệu chuyên dụng Night Solution, biến những bức ảnh thành “kiệt tác” nghệ thuật.</p></li></ul>',1,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748427293573-s24.webp',21000000,'active'),(13,'Áo khoác hoodie unisex Local Brand BYS - MKS1',5,'<p><strong>Thông tin sản phẩm : Áo khoác hoodie unisex Local Brand BYS - MKS1</strong></p><p>&nbsp;</p><ul class=\"list-disc pl-4\"><li><p>Chất liệu: Thun 100% Cotton cao cấp, thấm hút mồ hôi rất tốt, thoáng mát, mềm mịn, thoáng mát, không xù lông.</p></li><li><p>Màu sắc: đen, nâu, beige</p></li><li><p>Thiết kế: Trẻ trung, hiện đại thể hiện cá tính</p></li><li><p>Xuất xứ: Việt Nam</p></li><li><p>Đường may tỉ mỉ, chắc chắn. Màu sắc in ấn sắc nét ,Cam kết không bong tróc</p></li><li><p>Mặc ở nhà, mặc đi chơi hoặc khi vận động thể thao. Phù hợp khi mix đồ với nhiều loại.</p></li></ul>',4,'https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/img/1748493046183-hoodi.webp',530000,'active');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productvariant`
--

DROP TABLE IF EXISTS `productvariant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productvariant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `typeValueId` int NOT NULL,
  `quantity` int NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductVariant_productId_fkey` (`productId`),
  KEY `ProductVariant_typeValueId_fkey` (`typeValueId`),
  CONSTRAINT `ProductVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductVariant_typeValueId_fkey` FOREIGN KEY (`typeValueId`) REFERENCES `variantvalue` (`typeValueId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productvariant`
--

LOCK TABLES `productvariant` WRITE;
/*!40000 ALTER TABLE `productvariant` DISABLE KEYS */;
INSERT INTO `productvariant` VALUES (1,2,1,8,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1744606058351-iphone131.png',80000),(2,2,1,8,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1744606058351-iphone132.png',90000),(3,3,5,30,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748151678590-tld2.webp',30000),(4,3,7,9,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748151678590-tld3.webp',35000),(5,3,6,22,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748151678590-tld4.webp',32000),(6,4,8,10,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748152535151-aoden.webp',112000),(7,4,9,9,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748152535152-aotrang.webp',120000),(8,4,11,22,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748152535152-aonau.webp',110000),(9,4,10,25,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748152535152-aodo.webp',150000),(10,5,12,15,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748234277810-chuotden.webp',300000),(11,5,14,7,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748234277810-chuotxam.webp',285000),(12,6,13,10,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748242148021-banphim2.webp',350000),(13,6,12,9,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748242148021-banphim3.webp',285000),(14,7,16,10,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245272913-quan2.webp',130000),(15,7,15,9,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245272913-quan3.webp',132000),(16,7,17,22,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245272913-quan4.webp',125000),(17,8,16,10,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245692663-quannu2.webp',160000),(18,8,15,9,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245692663-quannu3.webp',145000),(19,8,17,14,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245692663-quannu4.webp',135000),(20,9,17,30,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245844524-bagyy2.webp',142000),(21,9,16,22,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245844524-bagyy3.webp',144000),(22,9,15,14,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748245844524-baggy4.webp',148000),(23,10,9,9,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748247035763-aobo2.webp',223000),(24,10,8,8,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748247035763-aobo4.webp',215000),(25,10,11,22,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748247035763-aobo3.webp',200000),(26,11,18,12,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748426461965-samsung2.webp',1999000),(27,11,19,8,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748426461965-samsung3.webp',1890000),(28,11,20,12,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748426461965-samsung4.webp',1800000),(29,12,23,9,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748427294445-s24tim.webp',21000000),(30,12,24,8,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748427294445-s24xam.webp',21000000),(31,12,20,21,'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/1748427294445-s24den.webp',21000000),(32,13,11,10,'https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/img/1748493047198-hoodi2.webp',530000),(33,13,9,9,'https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/img/1748493047198-hoodi1.webp',550000),(34,13,8,22,'https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/img/1748493047198-hoodi.webp',510000);
/*!40000 ALTER TABLE `productvariant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `ratingId` int NOT NULL AUTO_INCREMENT,
  `billDetailId` int NOT NULL,
  `customerId` int NOT NULL,
  `ratingValue` int NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ratingId`),
  UNIQUE KEY `Rating_billDetailId_key` (`billDetailId`),
  KEY `Rating_customerId_fkey` (`customerId`),
  CONSTRAINT `Rating_billDetailId_fkey` FOREIGN KEY (`billDetailId`) REFERENCES `billdetail` (`billDetailId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Rating_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,21,4,4,'máy dùng khá là mượt, sẽ mua lại',1,'2025-05-20 08:15:40.444'),(2,22,6,5,'ok đấy, shop uy tín cho 5 sao',1,'2025-05-20 08:44:13.688'),(3,23,1,5,'kha la ok',1,'2025-05-28 04:19:29.187'),(4,24,9,5,'rất đáng để chờ đợi',1,'2025-05-29 03:43:48.203'),(5,32,4,4,'sản phẩm dùng được',1,'2025-05-31 01:30:43.971');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `shopId` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `shopName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopAvatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shopBanner` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shopNumberPhone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailShop` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalSales` int NOT NULL,
  `totalProduct` int NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`shopId`),
  UNIQUE KEY `Shop_customerId_key` (`customerId`),
  CONSTRAINT `Shop_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,1,'shop cua linh phong','hung yen viet nam','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1746518608665-f2ce938a-fd95-4d94-a4aa-77bda741da02.png','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1746518612548-cnn.png','0862889603','phongnguyen2863@gmail.com',0,0,'active'),(2,9,'KICHAELS','Trung Hoà Cầu Giấy Hà Nội','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1748149895337-logo1.webp','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1748149896131-danh-sach-108-vi-anh-hung-luong-son-bac.jpg','0987654321','phong@gmail.com',0,0,'active'),(3,2,'Gaming house','Thành phố Hồ Chí Minh','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1748233001418-gaming.webp','https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1748233002735-dong-song-venice-tho-mong.jpg','0979623134','Gaminghouse@gmail.com',0,0,'active'),(4,10,'fashion 2hand','Hà Đông Hà Nội','https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/img/-1748492748007-dochoi1.png','https://sgvkftuhdvhqhkxjxbon.supabase.co/storage/v1/object/public/tikistogare/img/-1748492749315-Shopee-Short-Link-featured.png','0974315787','uyennga1310@gmail.com',0,0,'active');
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statusbill`
--

DROP TABLE IF EXISTS `statusbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statusbill` (
  `statusId` int NOT NULL AUTO_INCREMENT,
  `statusName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`statusId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statusbill`
--

LOCK TABLES `statusbill` WRITE;
/*!40000 ALTER TABLE `statusbill` DISABLE KEYS */;
INSERT INTO `statusbill` VALUES (1,'chưa thanh toán'),(2,'đã thanh toán'),(3,'đang giao hàng'),(4,'đã giao hàng'),(5,'đã hủy đơn hàng'),(6,'thanh toán sau khi nhận hàng');
/*!40000 ALTER TABLE `statusbill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `varianttype`
--

DROP TABLE IF EXISTS `varianttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `varianttype` (
  `typeId` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`typeId`),
  KEY `VariantType_categoryId_fkey` (`categoryId`),
  CONSTRAINT `VariantType_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `varianttype`
--

LOCK TABLES `varianttype` WRITE;
/*!40000 ALTER TABLE `varianttype` DISABLE KEYS */;
INSERT INTO `varianttype` VALUES (1,'màu sắc',17),(2,'loại kính',11),(3,'size',4),(4,'Tần số quét',23),(5,'size',6),(6,'Ram - Rom',15),(7,'màu sắc',48),(8,'màu sắc',5),(9,'màu sắc',24),(10,'màu sắc',15);
/*!40000 ALTER TABLE `varianttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variantvalue`
--

DROP TABLE IF EXISTS `variantvalue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variantvalue` (
  `typeValueId` int NOT NULL AUTO_INCREMENT,
  `typeId` int NOT NULL,
  `typeValue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`typeValueId`),
  KEY `VariantValue_typeId_fkey` (`typeId`),
  CONSTRAINT `VariantValue_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `varianttype` (`typeId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variantvalue`
--

LOCK TABLES `variantvalue` WRITE;
/*!40000 ALTER TABLE `variantvalue` DISABLE KEYS */;
INSERT INTO `variantvalue` VALUES (1,6,'4GB/64GB'),(2,1,'đỏ'),(3,1,'Xanh'),(4,4,'60hz'),(5,7,'vàng'),(6,7,'xanh'),(7,7,'đen'),(8,8,'đen'),(9,8,'Trắng'),(10,8,'đỏ'),(11,8,'nâu'),(12,9,'đen'),(13,9,'trắng'),(14,9,'xám'),(15,3,'L(60-70kg)'),(16,3,'M(50-60kg)'),(17,3,'S(40-50kg)'),(18,10,'xanh băng'),(19,10,'xanh ngọc'),(20,10,'đen'),(21,10,'trắng'),(22,10,'vàng'),(23,10,'tím'),(24,10,'xám');
/*!40000 ALTER TABLE `variantvalue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-08  7:59:09
