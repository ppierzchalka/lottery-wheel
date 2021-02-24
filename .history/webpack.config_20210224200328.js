const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/lib.ts",
	devtool: "inline-source-map",
	mode: "development",
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
		filename: "library.js",
		path: path.resolve(__dirname, "public"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Lottery wheel",
		}),
	],
};
