const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname,

  cache: {
    type: 'filesystem',

    buildDependencies: {
      config: [__filename],
    },
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  externals: {
    'aws-sdk': 'commonjs2 aws-sdk',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },

  plugins: [new ForkTsCheckerWebpackPlugin()],
};
