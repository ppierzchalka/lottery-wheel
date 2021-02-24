const path = require("path");

module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, "src/library.ts"),
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: ["ts-loader"],
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		contentBase: "./public",
	},
	resolve: {
		extensions: [".ts", ".js"],
		modules: [
			path.resolve(__dirname, "src"),
			path.resolve(__dirname, "node_modules"),
		],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "lottery-wheel.js",
		library: "lotteryWheel",
		libraryTarget: "umd",
	},
};
