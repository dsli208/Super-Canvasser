const express = require('express');
const server = express();

server.set('port', process.env.PORT || 3001 );

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