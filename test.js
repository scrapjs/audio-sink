var Gen = require('audio-generator');
var Sink = require('./');
var Transform = require('stream').Transform;

Gen(function (time) {
	return time ? 0 : 1;
})
.pipe(Sink(function (data) {
	console.log('Passed through chunk of data ', data.length);
}))
.pipe(Transform({
	transform: function (data, enc, cb) {
		cb(null, data)
	}
}))
.pipe(Sink(function (data) {
	console.log('Got chunk of data ', data.length);
}))