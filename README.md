# node-jsnark

Run [Benchmark.js](http://benchmarkjs.com/) tests from js files.

## Install

```
> npm install -g jsnark
```

## Usage

```
> jsnark [--async] <file> ...
```

Flags:
 --async: run tests asyncronously (default)
 --no-async: run tests synchronously

Example:
```
> jsnark test-file-1.js
```

Output:

```
Added test: RegExp#test
Added test: String#indexOf
Running benchmarks:

RegExp#test x 14,241,886 ops/sec ±0.20% (102 runs sampled)
String#indexOf x 27,520,213 ops/sec ±0.48% (99 runs sampled)

Fastest is String#indexOf
```

## Example test file

```javascript
var STR = "Hello World!";

module.exports = {
	'RegExp#test': function() {
		/o/.test(STR);
	},
	'String#indexOf': function() {
		STR.indexOf('o') > -1;
	}
};
```