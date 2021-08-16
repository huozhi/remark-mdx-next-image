const transformNextImage = require('..')

module.exports = (phase, { defaultConfig }) => {
  const webpack = (config, options) => {
    config.module.rules.push(
      {
        test: /\.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [
                transformNextImage
              ]
            },
          },
        ],
      }
    )
    return config
  }
  return {
    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
    webpack,
  } 
}
