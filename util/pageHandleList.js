/**
 * @description 列表页处理
 */

const cheerio = require('cheerio')
const pageDownload = require('./pageDownload')
const { listParseRule } = require('./crawlerConfig')

const listPageHandle = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageStr = await pageDownload(url)
      const $ = cheerio.load(pageStr)
      const itemObjArr = listParseRule($)
      if (itemObjArr.length) resolve(itemObjArr)
      else reject('列表页解析出错或无数据')
    } catch (err) { reject(err.message) }
  })
}

module.exports = listPageHandle