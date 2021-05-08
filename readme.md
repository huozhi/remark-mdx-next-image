# remark-mdx-next-image

### Effects

markdown

```md
![img](https://some.where/image.png)
```

JSX
```jsx
import NextImage from 'next/image'

// ...
<NextImage src="https://some.where/image.png" />
```

transform

### Usage

Use with `next.js` and `@mdx-js/loader`


`next.config.js`
```js
const transformNextImage = require('remark-mdx-next-image')

module.exports = (phase, { defaultConfig }) => {
  // support .md and .mdx extensions
  const pageExtensions = defaultConfig.pageExtensions.concat(['md', 'mdx'])
  const webpack = (config, options) => {
    config.module.rules.push(
      {
        test: /\.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {
              // use plugin
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
  } 
}
```
