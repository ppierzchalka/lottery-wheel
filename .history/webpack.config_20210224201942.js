const path = require("path");

module.exports = ["source-map"].map((devtool) => ({
	mode: "development",
	entry: "./src/lib.ts",
	devtool,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		contentBase: "./public",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "lottery-wheel.js",
		library: "lotteryWheel",
		libraryTarget: "var",
	},
}));
