const express 		= require('express');
const server 			= express();
const mysql     	= require('mysql');
var fs = require('fs');

server.set('port', process.env.PORT || 3001 );


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",									// put your MySQL db here
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

// fetch locations data
server.get('/locations', (req, res) => {
	connection.query('SELECT * FROM locations', function (error, results, fields) {
	  if (error) throw error;
	  //console.log('The solution is: ', results);
	  res.send(JSON.stringify(results));
	});
})


server.get('/managers', (req, res) => {
	const managers = [
		{id: 1, firstName: 'Trung', lastName: 'Vo'},
		{id: 2, firstName: 'Mike', lastName: 'Mathew'},
		{id: 3, firstName: 'Aiko', lastName: 'Chu'}
	];
	res.json(managers);
})

server.listen(server.get('port'), () => {
	console.log('Listening on port ' + server.get('port'));
});