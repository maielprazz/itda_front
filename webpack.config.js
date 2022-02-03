const path = require('path');
// const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VENDOR_LIBS = ['react', 'react-dom', 'react-router-dom'];

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: { directory: path.resolve(__dirname, 'dist'), watch: true },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  entry: {
    bundle: {
      import: path.join(__dirname, 'src', 'index.js'),
      dependOn: 'vendor',
    },
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'http://localhost:3000/',
    assetModuleFilename: '[name].[ext]',
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      // js for babel
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      // images
      {
        test: /\.(ico|svg|jpg|png|jpeg|gif)$/,
        type: 'asset/resource',
      },
      // css
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // sass
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  performance: {
    maxAssetSize: 10000000,
    maxEntrypointSize: 10000000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: path.resolve(__dirname, 'public/analytics.png'),
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new TerserPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' }),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
  ],
};
