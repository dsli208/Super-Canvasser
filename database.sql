DROP SCHEMA IF EXISTS `super_canvasser` ;
CREATE SCHEMA IF NOT EXISTS `super_canvasser` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `super_canvasser` ;

-------------------
----- users table
-------------------

DROP TABLE IF EXISTS `super_canvasser`.`users` ;

CREATE  TABLE IF NOT EXISTS `super_canvasser`.`users` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
	`firstName` VARCHAR(45) NOT NULL ,
	`lastName` VARCHAR(45) NOT NULL ,
	`role` VARCHAR(50) NOT NULL ,
	`email` VARCHAR(45) NOT NULL ,
	`phone` VARCHAR(45) NOT NULL ,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-------------------
----- locations table
-------------------

DROP TABLE IF EXISTS `super_canvasser`.`locations` ;

CREATE  TABLE IF NOT EXISTS `super_canvasser`.`locations` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
	`taskId` INT NOT NULL ,
	`longitude` DOUBLE NOT NULL ,
	`latitude` DOUBLE NOT NULL ,
	`talkingPoint` VARCHAR(45) NOT NULL ,
	`rate` DOUBLE NOT NULL ,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB;