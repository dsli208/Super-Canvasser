USE `super_canvasser` ;
-- -----------------------------------------------------
-- insert into users table
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM `super_canvasser`.`users`;

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `email`, `phone`)
VALUES ('Trung', 'Vo', 'trung.vo@stonybrook.edu', '6313277695' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `email`, `phone`)
VALUES ('Habin', 'Park', 'habin.park@stonybrook.edu', '6859277695' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `email`, `phone`)
VALUES ('Mike', 'Mathew', 'mike.mathew@stonybrook.edu', '6313277812' );