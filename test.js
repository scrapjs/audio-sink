var Gen = require('audio-generator');
var Sink = require('./');

Gen(function (time) {
	return time ? 0 : 1;
})
.pipe(Sink(function (data) {
	console.log('Passed through chunk of data ', data.length);
}))
.pipe(Sink(function (data) {
	console.log('Got chunk of data ', data.length);
}));