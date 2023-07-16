const request = require('request')
const zlib = require('zlib')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

const requestOptions = (url) => {
  return {
    url,
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'connection': 'keep-alive',
      'referer': 'https://www.dydytt.net/index2.htm',
      'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36'
    }
  }
}

const getItemPage = (url, index) => {
  return new Promise((resolve, reject) => {
    const req = request.get(requestOptions(url))

    req.on('response', res => {
      let chunks = []
      res.on('data', chunk => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        console.log('item页下载 - ok ' + index)
        const buffer = Buffer.concat(chunks)
        const fileBuffer = zlib.gunzipSync(buffer)
        const fileString = iconv.decode(fileBuffer, 'gb2312').toString()
        const $ = cheerio.load(fileString)
        const content = $('#Zoom').text()

        const ratingDouban = content.match(/豆瓣评分([\s|\d|\.]*)\/10/)
        const ratingIMDb = content.match(/IMDb评分([\s|\d|\.]*)\/10/)
        const itemInfo = {
          ratingDouban: ratingDouban && ratingDouban.length > 1 ? ratingDouban[1].trimLeft() : '',
          ratingIMDb: ratingIMDb && ratingIMDb.length > 1 ? ratingIMDb[1].trimLeft() : '',
          country: content.match(/◎产　　地([\s|\S]*)◎类/)[1].trimLeft().replaceAll(' ', ''),
          category: content.match(/◎类　　别([\s|\S]*)◎语/)[1].trimLeft().replaceAll(' ', ''),
          downloadUrl: $('#Zoom a').eq(0).attr('href')
        }
        console.log('item页解析 - ok ' + index)
        resolve(itemInfo)
      })
    })
  })
}

const getItemPages = (arr) => {
  promiseArr = arr.map(async (item, index) => {
    let { ratingDouban, ratingIMDb, category, country, downloadUrl } = await getItemPage(item.url, index)
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


module.exports = getItemPages
