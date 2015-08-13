#!/usr/bin/env node
"use strict";

var util = require('util')
var path = require('path');
var Benchmark = require('benchmark');

var colors = require('colors');
var Table = require('cli-table');

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
	console.log();

	var names = this.pluck('name');
	var hz = this.pluck('hz');

	var table = [];

	for (var i = 0; i < this.length; i++) {
		var row = table[i] = [];
		for (var j = 0; j < this.length; j++) {
			row[j] = ((hz[j] - hz[i]) / hz[j] * 100).toFixed(1);
		}
	}

	printTable(names, table);
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
		suite.add(name, tests[name], { maxTime: 0.2 });
		console.log('Added test: ' + name);
	}
}

function printTable(names, rows) {
	var headers = names.slice(0);
	headers.unshift('');

	rows = rows.map(function(row, i) {
		row = row.map(function(value) {
			if (value < 0) value = colors.red(value + '%');
			else if (value > 0) value = colors.green(value + '%');
			else value = value + '%';
			return value;
		});
		row.unshift(names[i]);
		return row;
	});

	var table = new Table({head: headers});
	rows.forEach(function(row) {
		table.push(row)
	});
	console.log(table.toString());
}
