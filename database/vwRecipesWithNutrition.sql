-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: Nutrition
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Final view structure for view `vwRecipesWithNutrition`
--

/*!50001 DROP VIEW IF EXISTS `vwRecipesWithNutrition`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`landonrepp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vwRecipesWithNutrition` AS select `R`.`recipeID` AS `recipeID`,`R`.`recipe` AS `recipe`,`R`.`link` AS `link`,`R`.`image` AS `image`,`R`.`servings` AS `servings`,sum((case when (`N`.`nutrient` = 'Calories') then (case when (`N`.`measure` = 'MG') then (`N`.`quantity` / 1000) else `N`.`quantity` end) else 0 end)) AS `Calories`,sum((case when (`N`.`nutrient` = 'Total Carbohydrate ') then (case when (`N`.`measure` = 'MG') then (`N`.`quantity` / 1000) else `N`.`quantity` end) else 0 end)) AS `Carbs`,sum((case when (`N`.`nutrient` = 'Protein') then (case when (`N`.`measure` = 'MG') then (`N`.`quantity` / 1000) else `N`.`quantity` end) else 0 end)) AS `Protein`,sum((case when (`N`.`nutrient` = 'Total Fat') then (case when (`N`.`measure` = 'MG') then (`N`.`quantity` / 1000) else `N`.`quantity` end) else 0 end)) AS `Fat` from (`tblRecipes` `R` join `tblNutrition` `N` on((`R`.`recipeID` = `N`.`recipeID`))) group by `R`.`recipeID`,`R`.`recipe`,`R`.`link`,`R`.`image`,`R`.`servings` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-20 17:54:43
