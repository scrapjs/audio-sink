Triggers an event for received audio chunk and releases the data. If piped to somewhere, it turns into a pass-throught stream. In that way it is [through2-sink](https://www.npmjs.com/package/through2-sink) and [tap-stream](https://www.npmjs.com/package/tap-stream) in one.

## Usage

[![npm install audio-sink](https://nodei.co/npm/audio-sink.png?mini=true)](https://npmjs.org/package/audio-sink/)

```js
var Gen = require('audio-generator');
var Sink = require('audio-sink');

Gen(function (time) {
	return time ? 0 : 1;
})
.pipe(Sink(function (data) {
	console.log('Passed through chunk of data ', data.length);
}))
.pipe(Sink(function (data) {
	console.log('Got chunk of data ', data.length);
}));
```

## Related

> [through2-sink](https://www.npmjs.com/package/through2-sink) — triggers an event for the data chunk, but does not pass data through.
> [tap-stream](https://www.npmjs.com/package/tap-stream) — triggers callback for the passed through data, but does not release data.