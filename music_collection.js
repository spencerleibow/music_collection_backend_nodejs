const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const artists = [
	{name: "Acuostic Alchemy"},
	{name: "Craig Chaquico"},
	{name: "David Benoit"},
	{name: "Fourplay"},
	{name: "Hiroshima"},
	{name: "Pat Metheny"},
	{name: "Rippingtons"},
	{name: "Spyro Gyra"},
	{name: "Yellowjackets"}
];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.write(JSON.stringify(artists, null, 2));
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
