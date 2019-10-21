-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: Nutrition
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Final view structure for view `vwDaysOfMeals`
--

/*!50001 DROP VIEW IF EXISTS `vwDaysOfMeals`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`landonrepp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vwDaysOfMeals` AS select `R1`.`recipeID` AS `R1recipeID`,`R1`.`recipe` AS `R1recipe`,`R1`.`link` AS `R1link`,`R1`.`image` AS `R1image`,`R1`.`servings` AS `R1servings`,`R1`.`Calories` AS `R1Calories`,`R1`.`Carbs` AS `R1Carbs`,`R1`.`Protein` AS `R1Protein`,`R1`.`Fat` AS `R1Fat`,`R2`.`recipeID` AS `R2recipeID`,`R2`.`recipe` AS `R2recipe`,`R2`.`link` AS `R2link`,`R2`.`image` AS `R2image`,`R2`.`servings` AS `R2servings`,`R2`.`Calories` AS `R2Calories`,`R2`.`Carbs` AS `R2Carbs`,`R2`.`Protein` AS `R2Protein`,`R2`.`Fat` AS `R2Fat`,`R3`.`recipeID` AS `R3recipeID`,`R3`.`recipe` AS `R3recipe`,`R3`.`link` AS `R3link`,`R3`.`image` AS `R3image`,`R3`.`servings` AS `R3servings`,`R3`.`Calories` AS `R3Calories`,`R3`.`Carbs` AS `R3Carbs`,`R3`.`Protein` AS `R3Protein`,`R3`.`Fat` AS `R3Fat` from ((`vwRecipesWithNutrition` `R1` join `vwRecipesWithNutrition` `R2`) join `vwRecipesWithNutrition` `R3`) where ((`R1`.`Calories` > 400) and (`R2`.`Calories` > 400) and (`R3`.`Calories` > 400) and (((`R1`.`Calories` + `R2`.`Calories`) + `R3`.`Calories`) < 1800) and (((`R1`.`Carbs` + `R2`.`Carbs`) + `R3`.`Carbs`) < 1800) and (((`R1`.`Protein` + `R2`.`Protein`) + `R3`.`Protein`) < 1800) and (`R1`.`recipe` <> `R2`.`recipe`) and (`R2`.`recipe` <> `R3`.`recipe`) and (`R1`.`recipe` <> `R3`.`recipe`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-20 19:37:13
