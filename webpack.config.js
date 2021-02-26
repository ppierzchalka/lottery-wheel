/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: ["./src/library"],
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.(ts|js)?$/i,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-typescript"],
					},
				},
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		static: ["public"],
		host: "localhost",
		port: 2137,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ESLintPlugin({
			files: "src/**/*.ts",
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
	],
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
};
