DROP SCHEMA IF EXISTS `super_canvasser` ;
CREATE SCHEMA IF NOT EXISTS `super_canvasser` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `super_canvasser` ;

/*
----- users table -------
*/

DROP TABLE IF EXISTS `super_canvasser`.`users` ;

CREATE  TABLE IF NOT EXISTS `super_canvasser`.`users` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
	`firstName` VARCHAR(45) NOT NULL ,
	`lastName` VARCHAR(45) NOT NULL ,
	`username` VARCHAR(45) NOT NULL,
	`role` VARCHAR(50) NOT NULL ,
	`email` VARCHAR(45) NOT NULL ,
	`phone` VARCHAR(45) NOT NULL ,
	`password` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB;

/*
----- locations table -------
*/

DROP TABLE IF EXISTS `super_canvasser`.`locations` ;

CREATE  TABLE IF NOT EXISTS `super_canvasser`.`locations` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
	`fullAddress` VARCHAR(200) NOT NULL ,
	`street` VARCHAR(50) NOT NULL ,
	`city` VARCHAR(20) NOT NULL ,
	`state` VARCHAR(10) NOT NULL ,
	`zipcode` INT NOT NULL ,
	`country` VARCHAR(20) NOT NULL ,
	`duration` INT ,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB;

/*
----- questions table -------
*/

DROP TABLE IF EXISTS `super_canvasser`.`questions` ;

CREATE  TABLE IF NOT EXISTS `super_canvasser`.`questions` (
	`locationId` INT UNSIGNED NOT NULL ,
	`question` VARCHAR(500) NOT NULL ,
	`answer` VARCHAR(500) NOT NULL ,
	FOREIGN KEY (`locationId`) REFERENCES `super_canvasser`.`locations`(`id`)
) ENGINE = InnoDB;