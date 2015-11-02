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
    fs.copySync("public/index.html", "dist/index.html", {force: true});
    fs.copySync("public/main.css", "dist/main.css", {force: true});
    fs.copySync("public/bootstrap.min.css", "dist/bootstrap.min.css", {force: true});
    fs.copySync("public/cyborg.bootstrap.min.css", "dist/cyborg.bootstrap.min.css", {force: true});
    fs.copySync("public/favicon-32x32.png", "dist/favicon-32x32.png", {force: true});
});
