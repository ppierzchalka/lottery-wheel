const path = require("path");

module.exports = {
	entry: "./src/lib.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		filename: "library.js",
		path: path.resolve(__dirname, "public"),
	},
};
