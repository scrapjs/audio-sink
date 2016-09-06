/**
 * @module  audio-sink
 */
'use strict';


module.exports = function Sink (fn) {
	return sink;

	function sink (buffer, cb) {
		//if fn logger/pressure control
		if (fn) {
			//async fn
			if (fn.length > 1) {
				return fn.call(this, buffer, cb);
			}
			//sync fn
			else {
				let result = fn.call(this, buffer);
				cb(null, result);
				return;
			}
		}

		//simple drain
		if (cb) {
			return cb(null, buffer);
		}

		return buffer;
	}
}
