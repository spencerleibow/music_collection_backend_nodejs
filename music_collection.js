const express = require("express"); 
const mysql = require('mysql');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

function getDBConnection() {
	return mysql.createConnection({
		  host: "localhost",
		  user: "spencerleibow",
		  password: "sirspence",
		  database: "MusicCollection"
	});
}

app.get("/artists", function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	var con = getDBConnection();
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT * from artist", function (err, result) {
		    if (err) throw err;
		    console.log("artists=" + JSON.stringify(result, null, 2));
			res.json(result, null, 2);
		  });
	});
});

app.get("/albums", function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	var con = getDBConnection();
	var artist_id = req.query.artist_id;
	con.connect(function(err) {
		if (err) throw err;
		var sql;
		if (	artist_id == null) {
			sql = "SELECT a.id, a.name name, b.name artist_name, a.year from album a" +
			" INNER JOIN artist b ON a.artist_id = b.id";
		} else { 
			sql = "SELECT a.id, a.name, a.year from album a" +
			" WHERE a.artist_id = " + artist_id;
		}
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("artists=" + JSON.stringify(result, null, 2));
			res.json(result, null, 2);
		});
	});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
