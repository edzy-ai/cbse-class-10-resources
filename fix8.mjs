import fs from 'fs'
const f = 'src/pages/ChapterView.jsx'
let c = fs.readFileSync(f, 'utf8')
const updated = c.replace(/(<Link[^>]*to="\/[^"]*"[^>]*>)\s*Subject\s*(<\/Link>)/, '$1Home$2')
fs.writeFileSync(f, updated, 'utf8')
console.log('Done:', updated !== c)
