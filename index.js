#!/usr/bin/env node
"use strict";

var util = require('util')
var path = require('path');
var Benchmark = require('benchmark');

var args = require('minimist')(process.argv.slice(2), {
	boolean: [ 'async' ]
});

var files = args._;

if (files.length <= 0) {
	console.log('No test files');
	process.exit();
}

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
	console.log(event.target.toString());
});
suite.on('complete', function() {
	console.log('\nFastest is ' + this.filter('fastest').pluck('name'));
});

files.forEach(importTests);

delete args['_'];

console.log('Running benchmarks:');
console.log();
suite.run(args);

//
// Methods
//

function importTests(filepath) {
	var tests = require(path.resolve(filepath));
	for (var name in tests) {
		suite.add(name, tests[name]);
		console.log('Added test: ' + name);
	}
}
