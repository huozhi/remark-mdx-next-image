const visit = require('unist-util-visit-parents')

function getStringProps(node, keys) {
  return keys.reduce((res, key) => {
    const value = node[key]
    const pair = (typeof value === 'string' && value) ? {key: value} : {}
    return {...res, ...pair}
  }, {}) 
}

function createNextImageNode(node) {
  const props = {
    src: node.url,
    width: '100%',
    height: 'auto',
    layout: 'responsive',
    ...getStringProps(node, ['title', 'alt'])
  }
  const nextImageNode = {
    type: 'mdxJsxFlowElement',
    name: 'NextImage',
    attributes: Object.keys(props)
      .map(key => {
        return {
          type: 'mdxJsxAttribute',
          name: key,
          value: props[key],
        }
      })
  }
  return nextImageNode
}

function transformNextImage(tree) {
  visit(tree, 'image', (node, parents) => {  
    const parent = parents[parents.length - 1]
    if (parent.type === 'paragraph') {

      parent.type = 'mdxJsxFlowElement'
      parent.name = 'div'
      parent.attributes = []
      delete parent.value
      delete parent.position
      parent.children = [
        {
          type: 'mdxjsEsm',
          value: `import NextImage from 'next/image'`,
          data: undefined,
        },
        createNextImageNode(node),
      ]
    }
  })
}

function transformNextImagePlugin() {
  return transformNextImage
}

module.exports = transformNextImagePlugin
