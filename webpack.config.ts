const path = require("path");
import webpack from 'webpack';
function createConf(entry: string, output: string): webpack.Configuration {
  return {
    entry: entry,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    externalsType: 'window',
    resolve: {
      extensions: [".ts"],
    },
    output: {
      library: "lib",
      filename: output,
      path: path.resolve(__dirname, "dist/browser"),
    },
  };
}
module.exports = [
  createConf('./src/index.ts', 'index.js'),
  createConf('./src/utils.ts', 'utils.js'),
  createConf('./src/buffers/index.ts', 'buffer.js'),
];
