module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // ...existing webpack config modifications...
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        portableRecords: true,
      };
      return webpackConfig;
    }
  }
};
