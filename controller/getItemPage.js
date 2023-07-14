const fs = require('fs')
const request = require('request')
// const { DEST_DIR } = require('./config')

const options = {
  // src: `./${DEST_DIR}/02listPages-txt/`,
  // srcSuffix: '.txt',
  dest: `./cache/03item`,
  destSuffix: '.html.zip'
};

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
      'referer': 'https://www.dydytt.net',
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

const getItemPage = (id, url) => {
  const { dest, destSuffix } = options
  if (!fs.existsSync('cache')) fs.mkdirSync('cache')
  // if (!fs.existsSync(dest)) fs.mkdirSync(dest)
  // if (!fs.existsSync(dest + page + '/')) fs.mkdirSync(dest + page + '/')
  const stream = fs.createWriteStream(dest + id + destSuffix)

  return new Promise(resolve => {
    request(requestOptions(url))
      .pipe(stream)
      .on('close', err => {
        if (err) reject(err)
        else {
          resolve()
          console.log('详情页下载完成 - ' + id)
        }
      })
  })
}

module.exports = getItemPage