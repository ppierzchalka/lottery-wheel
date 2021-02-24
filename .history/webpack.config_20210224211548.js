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
		contentBase: [path.join(__dirname, "public"), path.join(__dirname, "dist")],
		compress: true,
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
		path: path.resolve(__dirname, "dist"),
		filename: "lottery-wheel.js",
		library: {
			name: "lotteryWheel",
			type: "umd",
		},
		publicPath: "/",
	},
}));
