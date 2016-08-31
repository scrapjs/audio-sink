var Generator = require('audio-generator');
var Sink = require('./');
var Transform = require('stream').Transform;

Generator(function (time) {
	return time ? 0 : 1;
}, {duration: .1})
.pipe(Sink(function (data) {
	console.log('Passed through chunk of data ', data.length);

	// setTimeout(cb, 100);
}))
.pipe(Transform({
	objectMode: true,
	transform: function (data, enc, cb) {
		cb(null, data)
	}
}))
.pipe(Sink(function (data, cb) {
	setTimeout(cb, 200);
	console.log('Got chunk of data ', data.length);
}))



// var Slice = require('../slice');

// Generator().pipe(Slice(2)).pipe(Sink(v => console.log(v)));
