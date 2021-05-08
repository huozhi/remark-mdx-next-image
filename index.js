const visit = require('unist-util-visit-parents')

const getStringProps = (node, keys) => {
  return keys.reduce((str, key) => {
    const value = node[key]
    const prop = (typeof value === 'string' && value) ? `${key}="${value}"` : ''
    return str + ' ' + prop
  }, '') 
}

function transformNextImage(tree) {
  visit(tree, 'root', (node) => {
    node.children.unshift({
      type: 'import',
      value: `import NextImage from 'next/image'`,
    })
  })

  visit(tree, 'image', (node, parents) => {
    const nextImageNode = {
      type: 'jsx',
      value: `<NextImage src="${node.url}" width="100%" height="auto" layout="responsive" ${getStringProps(node, ['title', 'alt'])} />`,
      position: node.position,
      indent: node.indent,
    }
    const parent = parents[parents.length - 1]
    const siblings = parent.children
    // next/image rendered `<div>` cannot be contained inside `<p>`
    if (parent.type === 'paragraph') {
      parent.type = 'div'
    }
    // replace <img> => <NextImage>
    siblings[siblings.indexOf(node)] = nextImageNode
  })
}

function transformNextImagePlugin() {
  return transformNextImage
}

module.exports = transformNextImagePlugin
