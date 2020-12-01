import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  context: __dirname,
  target: 'node',

  externals: {
    'aws-sdk': 'commonjs2 aws-sdk',
  },

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'webpack.out'),
    libraryTarget: 'commonjs',
  },

  optimization: {
    minimize: false,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },

  cache: {
    type: 'filesystem',

    buildDependencies: {
      config: [__filename],
    },
  },
};

export default config;
