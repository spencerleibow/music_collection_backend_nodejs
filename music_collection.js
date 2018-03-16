const http = require('http');
const url = require('url')

const Router = require('routes');
const router = Router();


const hostname = '127.0.0.1';
const port = 3000;

const artists = [
	{id: 1, name: "Acuostic Alchemy"},
	{id: 2, name: "Craig Chaquico"},
	{id: 3, name: "David Benoit"},
	{id: 4, name: "Fourplay"},
	{id: 5, name: "Hiroshima"},
	{id: 6, name: "Pat Metheny Group"},
	{id: 7, name: "Rippingtons"},
	{id: 8, name: "Spyro Gyra"},
	{id: 9, name: "Yellowjackets"}
];

const albums = [
	{id: 1, artist_id: 1, name: "Blue Chip"},
	{id: 2, artist_id: 1, name: "Back On The Case"},
	{id: 3, artist_id: 1, name: "Aart"},
	{id: 4, artist_id: 4, name: "Elixir"},
	{id: 5, artist_id: 4, name: "Heartfelt"},
	{id: 6, artist_id: 4, name: "X"},
	{id: 7, artist_id: 6, name: "Ametican Garage"},
	{id: 8, artist_id: 6, name: "First Circle"},
	{id: 9, artist_id: 8, name: "Morning Dance"},
	{id: 10, artist_id: 8, name: "Breakout"}
];

router.addRoute("/artists", getArtists);
router.addRoute("/albums", getAlbums);
router.addRoute("*", noop);

function getArtists(req, res, path) {
	res.write(JSON.stringify(artists, null, 2));
}

function getAlbums(req, res, path) {
	res.write(JSON.stringify(albums, null, 2));
}

function noop() {}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  var path = url.parse(req.url).pathname;
  console.log("path=" + path);
  var match = router.match(path);
  match.fn(req, res, match);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
