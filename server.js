const express 		= require('express');
const server 			= express();
const mysql     	= require('mysql');
var fs 						= require('fs');

server.set('port', process.env.PORT || 3001 );


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",						// put your MySQL db here
    database: "super_canvasser"				// our database
});

// connect MySQL database
connection.connect((err) => {
	if (err) console.log(err);
	console.log('MySQL connected...');
});


// perform queries here
// fetch users data from database back-end to front-end React (GET request)
server.get('/users', (req, res) => {
	connection.query('SELECT * FROM users', function (error, results, fields) {
	  if (error) console.log(err);
	  //console.log('The solution is: ', results);
	  res.send(JSON.stringify(results));
	});
})

//delete user
server.get('/users/delete', (req, res) => {
    const {id} = req.query;
    var sql = 'DELETE FROM users WHERE id=' + id;
    connection.query(sql, function (error, results, fields) {
        if (error) console.log(err);
        //console.log('The solution is: ', results);
        res.send(JSON.stringify(results));
    });
})

// add user
server.get('/users/add', (req, res) => {
	const {firstName, lastName, username, email, password, role} = req.query;
	var sql = 'INSERT INTO users (firstName, lastName, username, role, email, phone, password) VALUES (';
	sql += '\'' + firstName + '\'';
	sql += ',\'' + lastName + '\'';
	sql += ',\'' + username + '\'';
	sql += ',\'' + role + '\'';
	sql += ',\'' + email + '\'';
	sql += ',\'' + '\'';
	sql += ',\'' + password + '\')'; 

	connection.query(sql, (err, results, fields) => {
		if (err) {
			console.log(err);
		}
		console.log('Added user successfully!');
		var currentUser = {}
		currentUser.firstName = firstName;
		currentUser.lastName = lastName;
		currentUser.username = username;
		currentUser.email = email;
		currentUser.password = password;
		currentUser.role = role;

		res.send(JSON.stringify(currentUser));
	})
})

server.get('/users/update', (req, res) => {

    const {firstName, lastName, username, email, role, phone, id} = req.query;
    var sql = 'UPDATE users SET firstname=' + '\''+firstName+  '\''+', lastname=' + '\''+lastName + '\''+', username=' + '\''+username + '\''+', role=' + '\''+role + '\''+', email=' + '\''+email + '\''+', phone=' + '\''+phone + '\''+' WHERE id=' + '\''+id + '\'';

    console.log(id);

    connection.query(sql,(err, results, fields) => {
        if (err) {
            console.log(err);
        }
        console.log('Added user successfully!');
        res.send(JSON.stringify(results));
    })
})

// get current user from GUI React and save it to JSON file
// we use this to render current log in user in other components
server.get('/users/current', (req, res) => {
	const {username} = req.query;
	
	let sql = 'SELECT * FROM users WHERE username=' + '\'' + username + '\'';
	connection.query(sql, (err, results, fields) => {
		if (err) {
			console.log(err);
		}
		res.send(JSON.stringify(results));
	})
})

// get current user
server.get('/users/:currentUserName', (req, res) => {
	let sql = 'SELECT * FROM users WHERE username=' + '\'' + req.params.currentUserName + '\'';
	connection.query(sql, (err, results, fields) => {
		if (err) {
			console.log(err);
		}
		res.send(JSON.stringify(results));
	});
})

// fetch locations data
server.get('/locations', (req, res) => {
	connection.query('SELECT * FROM locations', function (error, results, fields) {
	  if (error) console.log(err);
	  //console.log('The solution is: ', results);
	  res.send(JSON.stringify(results));
	});
})


// add location
server.get('/locations/add', (req, res) => {
	const {fullAddress, street, city, state, zipcode, country, duration} = req.query;
	
	var sql = 'INSERT INTO locations (fullAddress, street, city, state, zipcode, country, duration) VALUES (';
	
	sql += '\'' + fullAddress + '\'';
	sql += ',\'' + street + '\'';
	sql += ',\'' + city + '\'';
	sql += ',\'' + state + '\'';
	sql += ',' + zipcode;
	sql += ',\'' + country + '\'' ;
	sql += ',' + duration + ')';

	connection.query(sql, (err, results, fields) => {
		if (err) {
			console.log(err);
		}
		console.log('Added location successfully!');
		res.send(JSON.stringify(results));
	}) 
})

// delete location
server.get('/locations/delete', (req, res) => {
	const {fullAddress, street, city, state, zipcode, country, duration} = req.query;

	var sql = 'DELETE FROM locations WHERE street=';
	sql += '\'' + street + '\'';
	
	connection.query(sql, (err, results, fields) => {
		if (err) {
			console.log(err);
		}
		console.log('Delete location successfully!');
		res.send(JSON.stringify(results));
	})
})

// edit location
server.get('/locations/edit', (req, res) => {
	const {id, fullAddress, street, city, state, zipcode, country, duration} = req.query;

	var sql = 'UPDATE locations SET ';
	sql += 'fullAddress=\'' + fullAddress + '\',';
	sql += 'street=\'' + street + '\', ';
	sql += 'city=\'' + city + '\', ';
	sql += 'state=\'' + state + '\', ';
	sql += 'zipcode=' + zipcode + ', ';
	sql += 'country=\'' + country + '\', ';
	sql += 'duration=' + duration ;
	sql += ' WHERE id=' + id;

	connection.query(sql, (err, results, fields) => {
		if (err) {
			console.log(err);
		}
		console.log('Update location successfully!');
		res.send(JSON.stringify(results));
	})
})

// search location ID based on address --> yield questions and answers
server.get('/locations/search', (req,res) => {
	const {id} = req.query;
	var sql = `SELECT *`;
	sql += ` FROM questions, locations WHERE questions.locationId = locations.id AND questions.locationId=${id}`;
	
	connection.query(sql, (err, results, fields) => {
		if (err) console.log(err);
		res.send(JSON.stringify(results));
	})
})

// add question to location
server.get('/locations/:locationId/questions/add', (req, res) => {
	const {question, answer} = req.query;
	var sql = 'INSERT INTO questions (locationId, question, answer) VALUES(';
	sql += req.params.locationId + ',\'' + question + '\',\'' + answer + '\')';

	connection.query(sql, (err, results, fields) => {
		if (err) console.log(err);
		res.send(JSON.stringify(results));
	})
})

server.listen(server.get('port'), () => {
	console.log('Listening on port ' + server.get('port'));
});