var ytdl = require('youtube-dl'),
	http = require('http'),
	url = require('url');
	
http.createServer(function (req, res) {
	var urlObj = url.parse(req.url, true),
		query = urlObj.query || {},
		link = query.v || 'http://youtu.be/ks5twIwaxuw';
		
		console.log(urlObj)
		
		video = ytdl(link, [/* adiddional parameters */], { cwd: __dirname });
		
	video.on('info', function(info) {
		console.log(info);
		
		res.writeHead(200, {
			'Content-Type': 'video/mp4',
			'Content-Disposition': 'inline; filename="'+info.filename+'"',
			'Content-Length': info.size
		});
		
		video.pipe(res);
	});
}).listen(8000);


console.log("Server listening on http://localhost:8000\nUse parameter ?v= to add video source");
