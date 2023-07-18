/**
 * @description 页面下载
 */

const request = require('request')
const zlib = require('zlib')
const iconv = require('iconv-lite')
const { requestHeader } = require('./crawlerConfig')

const downloadPage = (url) => {
  return new Promise((resolve, reject) => {
    const req = request.get({ url, headers: requestHeader })
    req.on('response', res => {
      let chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => {
        const buffer = Buffer.concat(chunks)
        const fileBuffer = zlib.gunzipSync(buffer)
        const fileString = iconv.decode(fileBuffer, 'gb2312').toString()
        resolve(fileString)
      })
    })
    req.on('error', err => reject(err))
  })
}

module.exports = downloadPage