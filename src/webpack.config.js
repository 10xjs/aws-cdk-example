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
      config: [__filename, './tsconfig.json', '../config/base.tsconfig.json'],
    },
  },
};
