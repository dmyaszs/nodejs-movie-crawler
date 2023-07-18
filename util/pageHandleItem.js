/**
 * @description 详情页处理(单个，批量)
 */

const cheerio = require('cheerio')
const pageDownload = require('./pageDownload')
const { itemParseRule } = require('./crawlerConfig')

const detailPageHandle = (url, index) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageStr = await pageDownload(url)
      const $ = cheerio.load(pageStr)
      const itemInfo = itemParseRule($)
      resolve(itemInfo)
    } catch (err) { reject(err.message) }
  })
}

const detailPagesHandle = (itemUrlArr) => {
  promiseArr = itemUrlArr.map(async (item, index) => {
    let {
      ratingDouban,
      ratingIMDb,
      category,
      country,
      downloadUrl
    } = await detailPageHandle(item.url, index)
    item.ratingDouban = ratingDouban
    item.ratingIMDb = ratingIMDb
    item.category = category
    item.country = country
    item.downloadUrl = downloadUrl
    delete item.url
    return item
  })

  return Promise.all(promiseArr)
}

module.exports = detailPagesHandle
