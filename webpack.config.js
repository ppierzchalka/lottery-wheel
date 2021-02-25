const path = require("path");

module.exports = ["source-map"].map((devtool) => ({
	mode: "development",
	entry: ["./src/library"],
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
		static: ["public"],
	},
	resolve: {
		extensions: [".ts", ".js"],
		modules: ["src", "node_modules"],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "lottery-wheel.js",
		library: "lotteryWheel",
		libraryTarget: "umd",
		publicPath: "/",
    umdNamedDefine: true,
	},
}));
