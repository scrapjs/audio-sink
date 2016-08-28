/**
 * @module  audio-delay
 */

var inherits = require('inherits');
var PassThrough = require('stream').PassThrough;


function Sink (fn) {
	if (!(this instanceof Sink)) return new Sink(fn);

	if (fn instanceof Function) this.log = fn;

	PassThrough.call(this, {
		highWaterMark: 0,
		objectMode: true
	});

	this.on('end', () => {
		console.log(1)
	})
}


inherits(Sink, PassThrough);


Sink.prototype.log = function () {
	//supposed that is redefined
}


Sink.prototype._transform = function (chunk, enc, cb) {
	//control pressure
	if (this.log.length > 1) {
		this.log(chunk, function () {
			cb(null, chunk);
		});
	}
	else {
		this.log(chunk);
		cb(null, chunk);
	}
}


Sink.prototype._write = function (chunk, enc, cb) {
	var self = this;
	if (!self._readableState.pipesCount) {
		if (this.log.length > 1) {
			this.log(chunk, function () {
				self.emit('data', chunk);
				cb();
			});
		}
		else {
			self.log(chunk);
			//just emulate data event
			self.emit('data', chunk);
			cb();
		}
	} else {
			PassThrough.prototype._write.call(this, chunk, enc, cb);
	}
};


module.exports = Sink;
