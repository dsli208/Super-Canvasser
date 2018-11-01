USE `super_canvasser` ;
-- -----------------------------------------------------
-- insert into users table
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM `super_canvasser`.`users`;

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Harry', 'Lu', 'harry', 'admin', 'harry.lu@stonybrook.edu', '6313277695', 'harrypass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Trung', 'Vo', 'trungvo', 'manager', 'trung.vo@stonybrook.edu', '6313277695', 'trungpass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Habin', 'Park', 'habinpark', 'canvasser', 'habin.park@stonybrook.edu', '6859277695', 'habinpass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Mike', 'Mathew', 'mikemathew', 'canvasser', 'mike.mathew@stonybrook.edu', '6313277812', 'mikepass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('First 4', 'Last 4', 'first4last4', 'canvasser', 'first4.last4@stonybrook.edu', '6313277812', 'first4pass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('First 5', 'Last 5', 'first5last5', 'canvasser', 'first5.last5@stonybrook.edu', '6313277812', 'first5pass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('First 6', 'Last 6', 'first6last6', 'canvasser', 'first6.last6@stonybrook.edu', '6313277812', 'first6pass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('First 7', 'Last 7', 'first7last7', 'canvasser', 'first7.last7@stonybrook.edu', '6313277812', 'first7pass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('First 8', 'Last 8', 'first8last8', 'manager', 'first8.last8@stonybrook.edu', '6313277812', 'first8pass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('First 9', 'Last 9', 'first9last9', 'manager', 'first9.last9@stonybrook.edu', '6313277812', 'first9pass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('First 10', 'Last 10', 'first10last10', 'admin', 'first10.last10@stonybrook.edu', '6313277812', 'first10pass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('First 11', 'Last 11', 'first11last11', 'admin', 'first11.last11@stonybrook.edu', '6313277812', 'first11pass' );

-- -----------------------------------------------------
-- insert into users table
-- -----------------------------------------------------

DELETE FROM `super_canvasser`.`locations`;

INSERT INTO `super_canvasser`.`locations` (`fullAddress`, `street`, `city`, `state`, `zipcode`, `country`, `duration`)
VALUES ('1147 N Country Rd, Stony Brook, New York, 11790, USA',
		 '1147 N Country Rd', 'Stony Brook', 'New York', 11790, 'USA', 12);

INSERT INTO `super_canvasser`.`locations` (`fullAddress`, `street`, `city`, `state`, `zipcode`, `country`, `duration`)
VALUES ('318 Wynn Ln, Port Jefferson, New York, 11777, USA',
		 '318 Wynn Ln', 'Port Jefferson', 'New York', 11777, 'USA', 10);

INSERT INTO `super_canvasser`.`locations` (`fullAddress`, `street`, `city`, `state`, `zipcode`, `country`, `duration`)
VALUES ('521 Lake Ave, St James, New York, 11780, USA',
		 '521 Lake Ave', 'St James', 'New York', 11780, 'USA', 15);

INSERT INTO `super_canvasser`.`locations` (`fullAddress`, `street`, `city`, `state`, `zipcode`, `country`, `duration`)
VALUES ('526 Main St, Islip, New York, 11751, USA',
		 '526 Main St', 'Islip', 'New York', 11751, 'USA', 20);

INSERT INTO `super_canvasser`.`locations` (`fullAddress`, `street`, `city`, `state`, `zipcode`, `country`, `duration`)
VALUES ('75 Washington Pl, New York, New York, 10011, USA',
		 '75 Washington Pl', 'Stony Brook', 'New York', 10011, 'USA', 25);

INSERT INTO `super_canvasser`.`locations` (`fullAddress`, `street`, `city`, `state`, `zipcode`, `country`, `duration`)
VALUES ('313 Smith Haven Mall, Lake Grove, New York, 11755, USA',
		 '313 Smith Haven Mall', 'Lake Grove', 'New York', 11755, 'USA', 30);



