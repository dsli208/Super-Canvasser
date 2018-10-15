USE `super_canvasser` ;
-- -----------------------------------------------------
-- insert into users table
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM `super_canvasser`.`users`;

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('Trung', 'Vo', 'canvasser', 'trung.vo@stonybrook.edu', '6313277695' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('Habin', 'Park', 'canvasser', 'habin.park@stonybrook.edu', '6859277695' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('Mike', 'Mathew', 'canvasser', 'mike.mathew@stonybrook.edu', '6313277812' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('First 4', 'Last 4', 'canvasser', 'first4.last4@stonybrook.edu', '6313277812' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('First 5', 'Last 5', 'canvasser', 'first5.last5@stonybrook.edu', '6313277812' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('First 6', 'Last 6', 'canvasser', 'first6.last6@stonybrook.edu', '6313277812' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('First 7', 'Last 7', 'canvasser', 'first7.last7@stonybrook.edu', '6313277812' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('First 8', 'Last 8', 'manager', 'first8.last8@stonybrook.edu', '6313277812' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('First 9', 'Last 9', 'manager', 'first9.last9@stonybrook.edu', '6313277812' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('First 10', 'Last 10', 'admin', 'first10.last10@stonybrook.edu', '6313277812' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `role`, `email`, `phone`)
VALUES ('First 11', 'Last 11', 'admin', 'first11.last11@stonybrook.edu', '6313277812' );

-- -----------------------------------------------------
-- insert into users table
-- -----------------------------------------------------

DELETE FROM `super_canvasser`.`locations`;

INSERT INTO `super_canvasser`.`locations` (`taskId`, `longitude`, `latitude`, `talkingPoint`, `rate`)
VALUES (1, -73.140943, 40.925654, 'talking point 1', '5.0');

INSERT INTO `super_canvasser`.`locations` (`taskId`, `longitude`, `latitude`, `talkingPoint`, `rate`)
VALUES (2, -73.215653, 40.893897, 'talking point 2', '6.0');

INSERT INTO `super_canvasser`.`locations` (`taskId`, `longitude`, `latitude`, `talkingPoint`, `rate`)
VALUES (1, -119.417931, 36.778259, 'talking point 3', '7.0');

INSERT INTO `super_canvasser`.`locations` (`taskId`, `longitude`, `latitude`, `talkingPoint`, `rate`)
VALUES (3, -111.093735, 34.048927, 'talking point 4', '8.0');

INSERT INTO `super_canvasser`.`locations` (`taskId`, `longitude`, `latitude`, `talkingPoint`, `rate`)
VALUES (3, -99.901810, 31.968599, 'talking point 5', '9.0');

INSERT INTO `super_canvasser`.`locations` (`taskId`, `longitude`, `latitude`, `talkingPoint`, `rate`)
VALUES (4, -97.743057, 30.267153, 'talking point 6', '10.0');

INSERT INTO `super_canvasser`.`locations` (`taskId`, `longitude`, `latitude`, `talkingPoint`, `rate`)
VALUES (5, -73.140943, 40.925654, 'talking point 7', '11.0');

INSERT INTO `super_canvasser`.`locations` (`taskId`, `longitude`, `latitude`, `talkingPoint`, `rate`)
VALUES (4, -73.140943, 40.925654, 'talking point 8', '12.0');


