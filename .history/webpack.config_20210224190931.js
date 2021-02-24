const path = require("path");

module.exports = {
  port: 2137,
	entry: "./src/lib.ts",
  devtool: "inline-source-map",
  mode: 'development',
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
