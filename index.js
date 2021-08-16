const visit = require('unist-util-visit-parents')

function stringifyImageProp(node, prop) {
  return node[prop] ? `${prop}="${node[prop]}"` : ''
}

function createNextImageNode(node, imageImportIdentifier) {
  const nextImageNode = {
    type: 'jsx',
    value: `<NextImage src={${imageImportIdentifier}}` + 
      `${stringifyImageProp(node, 'title')} ` +
      `${stringifyImageProp(node, 'alt')} />`,
    position: node.position,
    indent: node.indent,
  }
  return nextImageNode
}

function transformNextImage(tree) {
  let hasInjectedImage = false
  let imageIndex = 0
  visit(tree, 'image', (node, parents) => {
    const parent = parents[parents.length - 1]
    if (parent.type === 'paragraph') {
      parent.type = 'div'
      parent.attributes = []
      delete parent.value
      delete parent.position

      const siblings = parent.children
      siblings.splice(siblings.indexOf(node), 1)
      if (!hasInjectedImage) {
        tree.children.unshift({
          type: 'import',
          value: `import NextImage from 'next/image'`,
        })
        hasInjectedImage = true
      }
      const imageImportIdentifier = `imageSrc${imageIndex++}`
      tree.children.unshift({
        type: 'import',
        value: `import ${imageImportIdentifier} from '${node.url}'`,
      })
      siblings.push(createNextImageNode(node, imageImportIdentifier))
    }
  })
}

function transformNextImagePlugin() {
  return transformNextImage
}

module.exports = transformNextImagePlugin
