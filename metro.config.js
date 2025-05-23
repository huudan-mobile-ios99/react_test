const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx', 'json'],
      assetExts: [...assetExts, 'png', 'jpg', 'jpeg', 'svg', 'gif'],
    },
  };
})();