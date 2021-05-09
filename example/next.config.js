const transformNextImage = require('..')

module.exports = (phase, { defaultConfig }) => {
  const pageExtensions = ['md', 'mdx'].concat(defaultConfig.pageExtensions)
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
          }
        ],
      }
    )
    return config
  }
  return {
    ...defaultConfig,
    pageExtensions,
    webpack,
    images: {
      domains: ['user-images.githubusercontent.com']
    }
  } 
}
