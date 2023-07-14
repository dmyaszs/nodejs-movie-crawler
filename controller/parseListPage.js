const fs = require('fs')
const zlib = require('zlib')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
// const { DEST_DIR } = require('./config')

const options = {
  src: `./cache/01list`,
  srcSuffix: '.html.zip',
  dest: `./cache/02list`,
  destSuffix: '.txt'
}

const parseListPage = () => {
  return new Promise(resolve => {
    const { src, srcSuffix, dest, destSuffix } = options
    const fileZipBuffer = fs.readFileSync(`${src + srcSuffix}`)
    const fileBuffer = zlib.gunzipSync(fileZipBuffer)
    const fileString = iconv.decode(fileBuffer, 'gb2312').toString()
    const $ = cheerio.load(fileString)

    const itemUrls = []
    for (let i = 0; i < $('.co_content8').eq(0).find('a').length; i++) {
      if ($('.co_content8').eq(0).find('a').eq(i).text().indexOf('字') > -1) {
        itemUrls.push('https://www.dydytt.net' + $('.co_content8').eq(0).find('a').eq(i).attr('href'))
      }
    }

    // if (!fs.existsSync(dest)) fs.mkdirSync(dest)
    if(itemUrls.length) fs.writeFileSync(dest + destSuffix, itemUrls.toString())
    console.log('列表页解析完成' + ' - ' + itemUrls.length)
    resolve(itemUrls)
  })
}

module.exports = parseListPage
