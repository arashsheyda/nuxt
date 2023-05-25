import fg from 'fast-glob'
import fs from 'fs-extra'

async function getDocs () {
  const files = await fg(['docs/**/*.md'], {
    ignore: ['**/README.md', '**/**index.md']
  }).then((files) => {
    return files.map((file) => {
      const path = file.replace(/\/\d+\./g, '/').replace(/\.md$/, '').replace(/\/index$/, '').replace(/^docs/, '')
      const id = `doc${path.replace(/\//g, ':')}`
      const title = (path.split('/').pop() || 'undefined').replace(/-/g, ' ')
      return {
        id,
        title,
        path: `https://nuxt.com/docs${path}`
      }
    })
  })
  return files
}

// write docs.json
getDocs().then((docs) => {
  fs.outputJSON('docs-list.json', docs)
})
