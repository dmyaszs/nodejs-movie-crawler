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

const getListPage = (url) => {
  return new Promise((resolve, reject) => {
    const req = request.get(requestOptions(url))

    req.on('response', res => {
      let chunks = []
      res.on('data', chunk => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        console.log('list页下载 - ok')
        const buffer = Buffer.concat(chunks)
        const fileBuffer = zlib.gunzipSync(buffer)
        const fileString = iconv.decode(fileBuffer, 'gb2312').toString()
        const $ = cheerio.load(fileString)

        const itemUrls = []
        for (let i = 0; i < $('.co_content8').eq(0).find('a').length; i++) {
          if ($('.co_content8').eq(0).find('a').eq(i).text().indexOf('字') > -1) {
            itemUrls.push({
              name: $('.co_content8').eq(0).find('a').eq(i).text().match(/《(\S*)》/)[1],
              url: 'https://www.dydytt.net' + $('.co_content8').eq(0).find('a').eq(i).attr('href')
            })
          }
        }

        console.log('list页解析 - ok ' + itemUrls.length)
        resolve(itemUrls)
      })
    })
  })
}

module.exports = getListPage