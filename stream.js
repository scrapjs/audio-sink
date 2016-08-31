/**
 * @module  audio-generator
 */
'use strict';


var inherits = require('inherits');
var PassThrough = require('stream').PassThrough;
var createSink = require('./index');


function Sink (fn) {
	if (!(this instanceof Sink)) return new Sink(fn);

	this.fn = createSink(fn);

	PassThrough.call(this, {
		highWaterMark: 0,
		objectMode: true
	});
}


inherits(Sink, PassThrough);


Sink.prototype._transform = function (chunk, enc, cb) {
	this.fn(chunk, cb);

	//control pressure
	// if (this.log.length > 1) {
	// 	this.log(chunk, function () {
	// 		cb(null, chunk);
	// 	});
	// }
	// else {
	// 	this.log(chunk);
	// 	cb(null, chunk);
	// }
}


Sink.prototype._write = function (chunk, enc, cb) {
	var self = this;
	if (!self._readableState.pipesCount) {
		this.fn(chunk, () => {
			self.emit('data', chunk);
			cb();
		});
		// if (this.log.length > 1) {
		// 	this.log(chunk, function () {
		// 		self.emit('data', chunk);
		// 		cb();
		// 	});
		// }
		// else {
		// 	self.log(chunk);
		// 	//just emulate data event
		// 	self.emit('data', chunk);
		// 	cb();
		// }
	} else {
		PassThrough.prototype._write.call(this, chunk, enc, cb);
	}
};


module.exports = Sink;
