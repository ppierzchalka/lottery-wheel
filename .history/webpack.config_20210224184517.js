const path = require("path");

module.exports = {
	entry: path.join(__dirname, "/src/lib.ts"),
	output: {
		filename: "library.js",
		path: path.join(__dirname, '/public/library.js'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
};
