const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // publicPath: '/vue2'
});
