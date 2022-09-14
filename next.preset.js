const path = require("path");

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // // SCSS
    // newConfig.module.rules.push({
    //   test: /\.(s*)css$/,
    //   loaders: ["style-loader", "css-loader", "sass-loader"],
    //   include: path.resolve(__dirname, "../styles/global.scss"),
    // });
    
    return newConfig;
  },
};
