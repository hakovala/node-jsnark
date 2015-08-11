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
> jsnark test-file-1.js test-file-2.js
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