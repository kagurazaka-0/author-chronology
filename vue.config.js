/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 * @type { Options }
 */
const config = {
  devServer: {
    host: "0.0.0.0",
  },
  chainWebpack: config => {
    // 参考1: https://github.com/Vibrant-Colors/node-vibrant/tree/develop#webpack-configuration
    // 参考2: https://cli.vuejs.org/guide/webpack.html#adding-a-new-loader
    config.module
      .rule("worker")
      // Add another loader
      .test(/\.worker.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .end()
  },
}

module.exports = config
