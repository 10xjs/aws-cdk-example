module.exports = {
  context: __dirname,
  target: 'node',

  externals: {
    'aws-sdk': 'commonjs2 aws-sdk',
  },

  devtool: 'inline-source-map',

  output: {
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
      webpackConfig: [__filename],
      tsConfig: ['./tsconfig.json'],
    },
  },
};
