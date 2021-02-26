const path = require("path");

module.exports = ["source-map"].map((devtool) => ({
	mode: "development",
	entry: path.resolve(__dirname, "/src/library.ts"),
	devtool,
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
		modules: [path.resolve(__dirname, "src")],
	},
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "lottery-wheel.js",
		library: "lotteryWheel",
		libraryTarget: "umd",
	},
}));
