const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	devServer: {
		historyApiFallback: true,
		contentBase: "./",
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "images",
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "fonts",
						},
					},
				],
			},
		],
	},

	plugins: [
		new HtmlWebPackPlugin({
			favicon: "./src/images/icon.png",
			template: "./src/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "main.css",
		}),
	],
};
