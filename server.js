const express 		= require('express');
const server 		= express();
const mysql     	= require('mysql');
var fs 				= require('fs');

server.set('port', process.env.PORT || 3001 );


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",						// put your MySQL db here
    database: "super_canvasser"				// our database
});

// connect MySQL database
connection.connect((err) => {
	if (err) throw err;
	console.log('MySQL connected...');
});


// perform queries here
// fetch users data from database back-end to front-end React (GET request)
server.get('/users', (req, res) => {
	connection.query('SELECT * FROM users', function (error, results, fields) {
	  if (error) throw error;
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
		fs.writeFile('./super_canvasser/src/data/currentUser.json', JSON.stringify(results), 'utf8', (err) => {
			if (err) {
				console.log(err);
			}
		})
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
		fs.writeFile('./super_canvasser/src/data/currentUser.json', JSON.stringify(results), 'utf8', (err) => {
			if (err) {
				console.log(err);
			}
		})
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
	  if (error) throw error;
	  //console.log('The solution is: ', results);
	  res.send(JSON.stringify(results));
	});
})


server.listen(server.get('port'), () => {
	console.log('Listening on port ' + server.get('port'));
});