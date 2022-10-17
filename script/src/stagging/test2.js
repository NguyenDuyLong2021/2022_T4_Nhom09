const mysql = require('mysql')
const connection = mysql.createConnection({
	host: 'techdak.studio',
	user: 'techdaks_dw',
	password: '`1234Qwert',
	database: 'techdaks_dw_db',
})

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack)
		return
	}

	console.log('connected as id ' + connection.threadId)
})