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
VALUES ('David', 'Li', 'davidli', 'canvasser', 'david.li@stonybrook.edu', '6313277812', 'davidpass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Thomas', 'Johnson', 'thomasjohnson', 'canvasser', 'thomas.johnson@stonybrook.edu', '6313277812', 'thomaspass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Tommy', 'Shock', 'tommy', 'canvasser', 'tommy.shock@stonybrook.edu', '6313277812', 'tommypass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Roger', 'Federer', 'rogerfed', 'manager', 'roger.federer@stonybrook.edu', '6313277812', 'rogerpass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Novak', 'Djokovic', 'nole', 'manager', 'novak.djokovic@stonybrook.edu', '6313277812', 'novakpass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Mark', 'Zuckerberge', 'mark', 'manager', 'mark.zuckerberg@stonybrook.edu', '6313277812', 'markpass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Bill', 'Gates', 'billgates', 'admin', 'bill.gates@stonybrook.edu', '6313277812', 'billpass' );

INSERT INTO `super_canvasser`.`users` (`firstName`,`lastName`, `username`, `role`, `email`, `phone`, `password`)
VALUES ('Scott', 'Stoller', 'scott', 'admin', 'scott.stoller@stonybrook.edu', '6313277812', 'scottpass' );

-- -----------------------------------------------------
-- insert into locations table
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



