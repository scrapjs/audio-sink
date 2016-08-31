/**
 * @module  audio-sink
 */
'use strict';


module.exports = function Sink (fn) {
	return function (buffer, cb) {
		if (fn) {
			if (fn.length > 1) {
				return fn(buffer, cb);
			}
			else {
				let result = fn(buffer);
				cb(null, result);
				return;
			}
		}

		cb(null, buffer);
		return buffer;
	}
}
