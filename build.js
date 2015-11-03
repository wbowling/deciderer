"use strict";

var webpack = require("webpack");
var config = require("./webpack.dist.config");
var fs = require("fs-extra");

var compiler = webpack(config);

compiler.run(function(err, stats) {
	if (err) {
		throw err;
	}
    console.log(stats.toString({colors: true, chunks: false}));
    fs.copySync("public", "dist/", {clobber: true});
});
