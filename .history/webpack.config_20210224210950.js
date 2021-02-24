const path = require("path");

module.exports = ["source-map"].map((devtool) => ({
	mode: "development",
	entry: path.resolve(__dirname, "src/library.ts"),
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
		contentBase: ["./public", "./dist", "./node_modules"],
		disableHostCheck: true,
		inline: true,
		publicPath: "/",
		port: 2137,
	},
	resolve: {
		extensions: [".ts", ".js"],
		modules: [
			path.resolve(__dirname, "src"),
			path.resolve(__dirname, "node_modules"),
		],
	},
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "lottery-wheel.js",
		library: "lotteryWheel",
		libraryTarget: "umd",
	},
}));
