/**
 * @description 列表页处理
 */

const cheerio = require('cheerio')
const pageDownload = require('./pageDownload')
const { listParseRule } = require('./crawlerConfig')

const listPageHandle = (url) => {
  return new Promise(async (resolve, reject) => {
    const pageStr = await pageDownload(url)
    const $ = cheerio.load(pageStr)
    const itemObjArr = listParseRule($)
    console.log('list页解析完成 ' + itemObjArr.length + '个item')
    resolve(itemObjArr)
  })
}

module.exports = listPageHandle