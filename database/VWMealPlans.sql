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
-- Final view structure for view `VWMealPlans`
--

/*!50001 DROP VIEW IF EXISTS `VWMealPlans`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`landonrepp`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `VWMealPlans` AS select `R1`.`Calories` AS `R1Calories`,`R1`.`Carbs` AS `R1Carbs`,`R1`.`Fat` AS `R1Fat`,`R1`.`image` AS `R1image`,`R1`.`link` AS `R1link`,`R1`.`Protein` AS `R1Protein`,`R1`.`recipe` AS `R1recipe`,`R1`.`recipeID` AS `R1recipeID`,`R1`.`servings` AS `R1servings`,`R2`.`Calories` AS `R2Calories`,`R2`.`Carbs` AS `R2Carbs`,`R2`.`Fat` AS `R2Fat`,`R2`.`image` AS `R2image`,`R2`.`link` AS `R2link`,`R2`.`Protein` AS `R2Protein`,`R2`.`recipe` AS `R2recipe`,`R2`.`recipeID` AS `R2recipeID`,`R2`.`servings` AS `R2servings`,`R3`.`Calories` AS `R3Calories`,`R3`.`Carbs` AS `R3Carbs`,`R3`.`Fat` AS `R3Fat`,`R3`.`image` AS `R3image`,`R3`.`link` AS `R3link`,`R3`.`Protein` AS `R3Protein`,`R3`.`recipe` AS `R3recipe`,`R3`.`recipeID` AS `R3recipeID`,`R3`.`servings` AS `R3servings`,`R4`.`Calories` AS `R4Calories`,`R4`.`Carbs` AS `R4Carbs`,`R4`.`Fat` AS `R4Fat`,`R4`.`image` AS `R4image`,`R4`.`link` AS `R4link`,`R4`.`Protein` AS `R4Protein`,`R4`.`recipe` AS `R4recipe`,`R4`.`recipeID` AS `R4recipeID`,`R4`.`servings` AS `R4servings`,`R5`.`Calories` AS `R5Calories`,`R5`.`Carbs` AS `R5Carbs`,`R5`.`Fat` AS `R5Fat`,`R5`.`image` AS `R5image`,`R5`.`link` AS `R5link`,`R5`.`Protein` AS `R5Protein`,`R5`.`recipe` AS `R5recipe`,`R5`.`recipeID` AS `R5recipeID`,`R5`.`servings` AS `R5servings`,`R6`.`Calories` AS `R6Calories`,`R6`.`Carbs` AS `R6Carbs`,`R6`.`Fat` AS `R6Fat`,`R6`.`image` AS `R6image`,`R6`.`link` AS `R6link`,`R6`.`Protein` AS `R6Protein`,`R6`.`recipe` AS `R6recipe`,`R6`.`recipeID` AS `R6recipeID`,`R6`.`servings` AS `R6servings` from (((((`vwRecipesWithNutrition` `R1` join `vwRecipesWithNutrition` `R2`) join `vwRecipesWithNutrition` `R3`) join `vwRecipesWithNutrition` `R4`) join `vwRecipesWithNutrition` `R5`) join `vwRecipesWithNutrition` `R6`) where ((`R1`.`Calories` >= 400) and (`R2`.`Calories` >= 400) and (`R3`.`Calories` >= 400) and (`R4`.`Calories` >= 400) and (`R5`.`Calories` >= 400) and (`R6`.`Calories` >= 400) and (((`R1`.`Calories` + `R2`.`Calories`) + `R3`.`Calories`) >= 1200) and (((`R1`.`Calories` + `R2`.`Calories`) + `R3`.`Calories`) >= 2700) and (((`R3`.`Calories` + `R4`.`Calories`) + `R5`.`Calories`) >= 1200) and (((`R3`.`Calories` + `R4`.`Calories`) + `R5`.`Calories`) >= 2700) and ((`R1`.`servings` + `R4`.`servings`) = 7) and ((`R2`.`servings` + `R5`.`servings`) = 7) and ((`R3`.`servings` + `R6`.`servings`) = 7) and (`R1`.`recipeID` not in (`R2`.`recipeID`,`R3`.`recipeID`,`R4`.`recipeID`,`R5`.`recipeID`,`R6`.`recipeID`)) and (`R2`.`recipeID` not in (`R1`.`recipeID`,`R3`.`recipeID`,`R4`.`recipeID`,`R5`.`recipeID`,`R6`.`recipeID`)) and (`R3`.`recipeID` not in (`R2`.`recipeID`,`R1`.`recipeID`,`R4`.`recipeID`,`R5`.`recipeID`,`R6`.`recipeID`)) and (`R4`.`recipeID` not in (`R2`.`recipeID`,`R3`.`recipeID`,`R1`.`recipeID`,`R5`.`recipeID`,`R6`.`recipeID`)) and (`R5`.`recipeID` not in (`R2`.`recipeID`,`R3`.`recipeID`,`R4`.`recipeID`,`R1`.`recipeID`,`R6`.`recipeID`)) and (`R6`.`recipeID` not in (`R2`.`recipeID`,`R3`.`recipeID`,`R4`.`recipeID`,`R5`.`recipeID`,`R1`.`recipeID`))) */;
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
