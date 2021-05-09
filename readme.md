# remark-mdx-next-image
> transform your images in markdown files

### Effects

markdown

```md
![img](https://some.where/image.png)
```

JSX
```jsx
import NextImage from 'next/image'
 
<NextImage 
  src="https://some.where/image.png"
  layout="responsive"
  {/* ... other props ... */}
/>
```

### Usage

```
yarn add -D remark-mdx-next-image
```

Configure `next.config.js`
```js
const transformNextImage = require('remark-mdx-next-image')

// configure webpack loader for md and mdx files
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
```

### Notice

Current version is only compatible with `@mdx-js/loader` v1.
